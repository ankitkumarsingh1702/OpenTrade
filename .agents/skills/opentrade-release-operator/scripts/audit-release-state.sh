#!/usr/bin/env bash
set -euo pipefail

expected_repository="ankitkumarsingh1702/OpenTrade"
cloud_project="hushh-tech-prod"
cloud_region="us-central1"
cloud_service="opentrade"
stable_url="https://opentrade-646258530541.us-central1.run.app"
run_smoke="false"
require_live="false"

usage() {
  printf 'Usage: %s [--smoke | --require-live]\n' "$0"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --smoke)
      run_smoke="true"
      ;;
    --require-live)
      run_smoke="true"
      require_live="true"
      ;;
    *)
      usage >&2
      exit 2
      ;;
  esac
  shift
done

for required_command in git gh gcloud jq; do
  if ! command -v "$required_command" >/dev/null 2>&1; then
    printf 'Missing required command: %s\n' "$required_command" >&2
    exit 1
  fi
done

repository_root="$(git rev-parse --show-toplevel)"
cd "$repository_root"

if ! gh auth status --hostname github.com >/dev/null 2>&1; then
  printf 'GitHub authentication unavailable\n' >&2
  exit 1
fi

resolved_repository="$(gh repo view --json nameWithOwner --jq '.nameWithOwner')"
if [[ "$resolved_repository" != "$expected_repository" ]]; then
  printf 'Unexpected GitHub repository: %s\n' "$resolved_repository" >&2
  printf 'Expected GitHub repository: %s\n' "$expected_repository" >&2
  exit 1
fi

git fetch --quiet origin main dev

current_branch="$(git branch --show-current)"
local_head="$(git rev-parse HEAD)"
dev_head="$(git rev-parse origin/dev)"
main_head="$(git rev-parse origin/main)"
main_contains_dev="false"
if git merge-base --is-ancestor "$dev_head" "$main_head"; then
  main_contains_dev="true"
fi

printf 'Repository state\n'
jq -n \
  --arg repository "$expected_repository" \
  --arg branch "$current_branch" \
  --arg localHead "$local_head" \
  --arg devHead "$dev_head" \
  --arg mainHead "$main_head" \
  --argjson mainContainsDev "$main_contains_dev" \
  --argjson clean "$([[ -z "$(git status --short)" ]] && printf true || printf false)" \
  '{repository: $repository, branch: $branch, clean: $clean, localHead: $localHead, devHead: $devHead, mainHead: $mainHead, mainContainsDev: $mainContainsDev}'

printf 'Protected branch requirements\n'
for protected_branch in dev main; do
  gh api "repos/${expected_repository}/branches/${protected_branch}/protection" \
    | jq --arg branch "$protected_branch" '{branch: $branch, requiredChecks: (.required_status_checks.contexts // []), enforceAdmins: .enforce_admins.enabled, requiredPullRequestReviews: (.required_pull_request_reviews != null), allowForcePushes: .allow_force_pushes.enabled, allowDeletions: .allow_deletions.enabled}'
done

printf 'Open pull requests\n'
gh pr list \
  --repo "$expected_repository" \
  --state open \
  --limit 20 \
  --json number,title,author,headRefName,baseRefName,isDraft,mergeStateStatus,url

printf 'Recent deployment runs\n'
deployment_runs="$(gh run list \
  --repo "$expected_repository" \
  --workflow deploy-dev.yml \
  --limit 20 \
  --json databaseId,event,status,conclusion,headSha,createdAt,updatedAt,url)"
jq . <<< "$deployment_runs"

printf 'Recent main-sync runs\n'
sync_runs="$(gh run list \
  --repo "$expected_repository" \
  --workflow sync-main.yml \
  --limit 20 \
  --json databaseId,event,status,conclusion,headSha,createdAt,updatedAt,url)"
jq . <<< "$sync_runs"

service_json="$(gcloud run services describe "$cloud_service" \
  --project "$cloud_project" \
  --region "$cloud_region" \
  --format=json)"

printf 'Cloud Run state\n'
jq --arg stableUrl "$stable_url" --arg devShortSha "${dev_head:0:7}" '{
  service: .metadata.name,
  serviceUrl: .status.url,
  stableUrl: $stableUrl,
  latestCreatedRevision: .status.latestCreatedRevisionName,
  latestReadyRevision: .status.latestReadyRevisionName,
  servingRevision: ([.status.traffic[]? | select(.percent == 100)][0].revisionName // null),
  servingLatestReady: (([.status.traffic[]? | select(.percent == 100)][0].revisionName // null) == .status.latestReadyRevisionName),
  servingDevHead: (([.status.traffic[]? | select(.percent == 100)][0].revisionName // "") | endswith($devShortSha)),
  traffic: [.status.traffic[]? | {revision: .revisionName, percent: (.percent // 0), tag: (.tag // null), url: (.url // null)}],
  ready: ([.status.conditions[]? | select(.type == "Ready")][0].status // "Unknown")
}' <<< "$service_json"

successful_deploy_url="$(jq -r --arg devHead "$dev_head" '[.[] | select(.headSha == $devHead and .status == "completed" and .conclusion == "success")][0].url // ""' <<< "$deployment_runs")"
matching_deploys_active="$(jq --arg devHead "$dev_head" '[.[] | select(.headSha == $devHead and (.status == "queued" or .status == "in_progress" or .status == "waiting" or .status == "pending"))] | length > 0' <<< "$deployment_runs")"
serving_revision="$(jq -r '[.status.traffic[]? | select(.percent == 100)][0].revisionName // ""' <<< "$service_json")"
latest_ready_revision="$(jq -r '.status.latestReadyRevisionName // ""' <<< "$service_json")"
service_ready="$(jq -r '[.status.conditions[]? | select(.type == "Ready")][0].status == "True"' <<< "$service_json")"
serving_dev_head="false"
if [[ "$serving_revision" == *"${dev_head:0:7}" ]]; then
  serving_dev_head="true"
fi
serving_latest_ready="false"
if [[ -n "$serving_revision" && "$serving_revision" == "$latest_ready_revision" ]]; then
  serving_latest_ready="true"
fi
exact_deploy_succeeded="false"
if [[ -n "$successful_deploy_url" ]]; then
  exact_deploy_succeeded="true"
fi
release_aligned="false"
if [[ "$main_contains_dev" == "true" && "$exact_deploy_succeeded" == "true" && "$matching_deploys_active" == "false" && "$service_ready" == "true" && "$serving_dev_head" == "true" && "$serving_latest_ready" == "true" ]]; then
  release_aligned="true"
fi

printf 'Release alignment\n'
jq -n \
  --arg devHead "$dev_head" \
  --arg successfulDeployUrl "$successful_deploy_url" \
  --arg servingRevision "$serving_revision" \
  --argjson exactDeploySucceeded "$exact_deploy_succeeded" \
  --argjson matchingDeploysActive "$matching_deploys_active" \
  --argjson serviceReady "$service_ready" \
  --argjson servingDevHead "$serving_dev_head" \
  --argjson servingLatestReady "$serving_latest_ready" \
  --argjson mainContainsDev "$main_contains_dev" \
  --argjson releaseAligned "$release_aligned" \
  '{devHead: $devHead, exactDeploySucceeded: $exactDeploySucceeded, successfulDeployUrl: $successfulDeployUrl, matchingDeploysActive: $matchingDeploysActive, serviceReady: $serviceReady, servingRevision: $servingRevision, servingDevHead: $servingDevHead, servingLatestReady: $servingLatestReady, mainContainsDev: $mainContainsDev, releaseAligned: $releaseAligned}'

if [[ "$run_smoke" == "true" ]]; then
  if ! command -v npm >/dev/null 2>&1; then
    printf 'Missing required command for smoke: npm\n' >&2
    exit 1
  fi
  printf 'Stable-route smoke\n'
  npm run smoke -- "$stable_url"
fi

if [[ "$require_live" == "true" && "$release_aligned" != "true" ]]; then
  printf 'Release is not fully aligned; inspect the evidence above\n' >&2
  exit 1
fi
