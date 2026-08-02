import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("dashboard enters the complete Arena flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /global trading arena/i })).toBeVisible();
  await expect(page.getByText("Progression")).toHaveCount(2);
  await expect(page.locator(".home-play-card")).toHaveCount(2);

  await page.getByRole("link", { name: /enter arena/i }).click();
  await expect(page).toHaveURL(/\/arena$/);
  await expect(page.getByRole("heading", { name: /pick a drill/i })).toBeVisible();
  await expect(page.getByRole("region", { name: "Locked modes" })).toContainText("7500 more XP to unlock");

  const higherLower = page.getByRole("button", { name: /higher \/ lower/i });
  await higherLower.click();
  await expect(higherLower).toHaveAttribute("aria-pressed", "true");
});

test("Home exposes the complete requested game journey", async ({ page }) => {
  await page.goto("/");

  const news = page.locator(".home-play-card--news");
  const tickerdle = page.locator(".home-play-card--tickerdle");
  await expect(news).toContainText("03");
  await expect(news).toContainText("News");
  await expect(news).toContainText("Match headlines to companies");
  await expect(news).toContainText("Elo 1500");
  await expect(news).toContainText("Easy 1/12");
  await expect(news).toContainText("Play");
  await expect(news).toHaveAttribute(
    "href",
    "https://www.opentrade.live/news?difficulty=easy&level=1&market=india",
  );
  await expect(news).not.toHaveAttribute("target", "_blank");

  await expect(tickerdle).toContainText("04");
  await expect(tickerdle).toContainText("Tickerdle");
  await expect(tickerdle).toContainText("Use state and exchange clues");
  await expect(tickerdle).toContainText("Elo 1500");
  await expect(tickerdle).toContainText("Easy 1/12");
  await expect(tickerdle).toContainText("Play");
  await expect(tickerdle).toHaveAttribute(
    "href",
    "https://www.opentrade.live/tickerdle?difficulty=easy&level=1&market=india",
  );
  await expect(tickerdle).not.toHaveAttribute("target", "_blank");

  const lockedModes = page.getByRole("region", { name: "Locked modes" });
  await expect(lockedModes).toContainText("Arena");
  await expect(lockedModes).toContainText("Build five picks. Beat ChatGPT.");
  await expect(lockedModes).toContainText("7500 more XP to unlock");
  await expect(lockedModes).not.toContainText("7700");
  await expect(lockedModes).toContainText("Real money");
  await expect(lockedModes).toContainText("Not available yet");
  await expect(lockedModes).toContainText("Complete four levels. Eligibility required.");

  const resources = page.getByRole("navigation", { name: "OpenTrade resources" });
  for (const [label, href] of [
    ["Games", "https://www.opentrade.live/games"],
    ["Learn", "https://www.opentrade.live/learn"],
    ["Blog", "https://www.opentrade.live/blog"],
    ["About", "https://www.opentrade.live/about"],
  ] as const) {
    const link = resources.getByRole("link", { name: label, exact: true });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).not.toHaveAttribute("target", "_blank");
  }

  await page.getByRole("button", { name: "Add your own game" }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Product preview");
  await expect(dialog).toContainText("Game submissions are not available in this product preview yet.");
});

test("navigation, competition validation, and profile preferences work", async ({ page }, testInfo) => {
  await page.goto("/compete");
  await expect(page.getByRole("heading", { level: 1, name: "Compete" })).toBeVisible();

  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("link", { name: "Compete" })).toHaveAttribute("aria-current", "page");
    await page.getByRole("button", { name: "Close navigation" }).click();
  } else {
    await expect(page.getByRole("link", { name: "Compete" })).toHaveAttribute("aria-current", "page");
  }
  await expect(page.getByRole("listitem")).toHaveCount(9);

  const email = page.getByLabel("Student email");
  await email.fill("not-an-email");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Enter a valid student email address.")).toBeVisible();

  await email.fill("student@iitm.ac.in");
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText("Campus interest saved in this local preview.")).toBeVisible();

  if (testInfo.project.name === "mobile") {
    await page.goto("/profile");
  } else {
    await page.getByRole("link", { name: "Profile" }).click();
  }
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("heading", { level: 1, name: "Profile" })).toBeVisible();

  const darkMode = page.getByRole("switch", { name: "Use dark appearance" });
  await expect(darkMode).toBeChecked();
  await darkMode.uncheck();
  await expect(darkMode).not.toBeChecked();
  await page.reload();
  await expect(page.getByRole("switch", { name: "Use dark appearance" })).not.toBeChecked();
});

test("desktop pages have no serious accessibility violations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop accessibility audit");
  for (const route of ["/", "/profile"]) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
    expect(results.violations).toEqual([]);
  }
});

test("mobile shell exposes navigation and HUD without overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile-only shell test");
  await page.goto("/");

  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();

  await page.getByRole("button", { name: "View command center" }).click();
  const hud = page.getByRole("dialog", { name: "Command center" });
  await expect(hud).toContainText("Operator_01");
  await hud.getByRole("link", { name: /Legal disclosures/ }).scrollIntoViewIfNeeded();
  await expect(hud.getByRole("navigation", { name: "Market" })).toBeVisible();
  await expect(hud.getByRole("link", { name: /Legal disclosures/ })).toBeVisible();
  const hudAccessibility = await new AxeBuilder({ page }).include(".mobile-drawer--hud").analyze();
  expect(hudAccessibility.violations).toEqual([]);
  await page.getByRole("button", { name: "Close command center" }).click();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
  await page.getByRole("navigation", { name: "OpenTrade resources" }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("navigation", { name: "OpenTrade resources" })).toBeVisible();
});

test("Command Center resources keep the approved copy and destinations", async ({ page }, testInfo) => {
  const routes = testInfo.project.name === "desktop" ? ["/", "/arena", "/compete", "/profile"] : ["/"];

  for (const route of routes) {
    await page.goto(route);

    if (testInfo.project.name === "mobile") {
      await page.getByRole("button", { name: "View command center" }).click();
    }

    const commandCenter =
      testInfo.project.name === "mobile"
        ? page.getByRole("dialog", { name: "Command center" })
        : page.getByRole("complementary", { name: "Command center sidebar" });

    const us = commandCenter.getByRole("link", { name: "US", exact: true });
    const india = commandCenter.getByRole("link", { name: "India", exact: true });
    const discord = commandCenter.getByRole("link", { name: /Join Discord/ });
    const legal = commandCenter.getByRole("link", { name: /Legal disclosures/ });

    await legal.scrollIntoViewIfNeeded();
    await expect(commandCenter.getByRole("heading", { name: "Market", exact: true })).toBeVisible();
    await expect(us).toHaveAttribute("href", "https://www.opentrade.live/?market=us");
    await expect(india).toHaveAttribute("href", "https://www.opentrade.live/?market=india");
    await expect(us.locator("img")).toHaveAttribute("src", "/assets/flags/us.svg");
    await expect(india.locator("img")).toHaveAttribute("src", "/assets/flags/india.svg");
    await expect
      .poll(() => us.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect
      .poll(() => india.locator("img").evaluate((image) => (image as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
    await expect(commandCenter.getByRole("heading", { name: "Refer a friend", exact: true })).toBeVisible();
    await expect(discord).toHaveAttribute("href", "https://discord.gg/bt2YuTNcbK");
    await expect(discord).toHaveAttribute("target", "_blank");
    await expect(discord).toHaveAttribute("rel", /noopener noreferrer/);
    await expect(commandCenter.locator(".command-center__disclosure")).toContainText(
      "OpenTrade is a product preview, not investment advice. Investing involves risk, including possible loss of principal.",
    );
    await expect(legal).toHaveAttribute("href", "https://www.opentrade.live/legal");
    await expect(legal).toHaveAttribute("target", "_blank");
    await expect(legal).toHaveAttribute("rel", /noopener noreferrer/);

    const horizontalOverflow = await commandCenter.evaluate((element) => element.scrollWidth - element.clientWidth);
    expect(horizontalOverflow).toBeLessThanOrEqual(0);

    if (testInfo.project.name === "mobile") {
      await page.getByRole("button", { name: "Close command center" }).click();
    }
  }
});

test("arena feedback is user-triggered, bounded, and reduced-motion safe", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop interaction-effects test");
  await page.addInitScript(() => {
    const state = { constructed: 0, feedback: 0, started: 0 };
    Object.defineProperty(window, "__arenaEffectsTest", { configurable: true, value: state });

    class AudioContextStub {
      currentTime = 0;
      destination = {};
      state = "running";

      constructor() {
        state.constructed += 1;
      }

      createGain() {
        return {
          connect() {},
          gain: {
            exponentialRampToValueAtTime() {},
            setValueAtTime() {},
          },
        };
      }

      createOscillator() {
        return {
          connect() {},
          frequency: {
            exponentialRampToValueAtTime() {},
            setValueAtTime() {},
          },
          start() {
            state.started += 1;
          },
          stop() {},
          type: "square",
        };
      }

      close() {
        return Promise.resolve();
      }

      resume() {
        return Promise.resolve();
      }
    }

    Object.defineProperty(window, "AudioContext", { configurable: true, value: AudioContextStub });
    window.addEventListener("opentrade:arena-feedback", () => {
      state.feedback += 1;
    });
  });

  await page.goto("/");
  expect(await page.evaluate(() => (window as unknown as { __arenaEffectsTest: { constructed: number } }).__arenaEffectsTest.constructed)).toBe(0);

  await page.getByRole("button", { name: "Add your own game" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const activeState = await page.evaluate(
    () => (window as unknown as { __arenaEffectsTest: { constructed: number; feedback: number; started: number } }).__arenaEffectsTest,
  );
  expect(activeState).toEqual({ constructed: 1, feedback: 1, started: 1 });
  expect(await page.locator(".tactical-click-burst").count()).toBeLessThanOrEqual(8);

  await page.getByRole("button", { name: "Close" }).click();
  await page.waitForTimeout(550);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Add your own game" }).click();
  expect(await page.locator(".tactical-click-burst").count()).toBe(0);
});

test("blocked Web Audio never blocks the requested action", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Desktop audio fallback test");
  await page.addInitScript(() => {
    Object.defineProperty(window, "AudioContext", { configurable: true, value: undefined });
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Add your own game" }).click();
  await expect(page.getByRole("dialog")).toContainText("Product preview");
});
