import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("dashboard enters the complete Arena flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /global trading arena/i })).toBeVisible();
  await expect(page.getByText("Progression")).toHaveCount(2);

  await page.getByRole("link", { name: /enter arena/i }).click();
  await expect(page).toHaveURL(/\/arena$/);
  await expect(page.getByRole("heading", { name: /pick a drill/i })).toBeVisible();

  const higherLower = page.getByRole("button", { name: /higher \/ lower/i });
  await higherLower.click();
  await expect(higherLower).toHaveAttribute("aria-pressed", "true");
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
  await page.goto("/profile");
  const results = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
  expect(results.violations).toEqual([]);
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
  const hudAccessibility = await new AxeBuilder({ page })
    .include(".mobile-drawer--hud")
    .disableRules(["color-contrast"])
    .analyze();
  expect(hudAccessibility.violations).toEqual([]);
  await page.getByRole("button", { name: "Close command center" }).click();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
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
