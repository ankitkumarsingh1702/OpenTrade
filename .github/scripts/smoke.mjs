const [baseUrlArgument] = process.argv.slice(2);

if (!baseUrlArgument) {
  console.error("Usage: npm run smoke -- https://service.example");
  process.exit(2);
}

const baseUrl = baseUrlArgument.replace(/\/$/, "");
const routes = ["/", "/arena", "/compete", "/profile", "/settings"];
const attempts = Number(process.env.SMOKE_ATTEMPTS ?? "12");
const delayMs = Number(process.env.SMOKE_DELAY_MS ?? "5000");

const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function checkRoute(route) {
  const response = await fetch(`${baseUrl}${route}`, {
    headers: { "user-agent": "OpenTrade-release-smoke/1.0" },
    redirect: "follow",
  });
  const body = await response.text();

  if (!response.ok || !body.includes("OpenTrade")) {
    throw new Error(
      `${route} returned ${response.status} without the OpenTrade marker`,
    );
  }
}

let lastError;
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    await Promise.all(routes.map(checkRoute));
    console.log(`Smoke passed for ${routes.length} routes at ${baseUrl}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.warn(
      `Smoke attempt ${attempt}/${attempts} failed: ${error.message}`,
    );
    if (attempt < attempts) await wait(delayMs);
  }
}

console.error(
  `Smoke failed at ${baseUrl}: ${lastError?.message ?? "unknown error"}`,
);
process.exit(1);
