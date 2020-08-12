import "expect-puppeteer";
import puppeteer from "puppeteer";

describe("Game of life", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:9000");
  });

  it('should display "Привет" text on start page', async () => {
    const text = await page.evaluate(() => document.body.textContent);
    expect(text).toContain("Привет");
  });

  it("should redirect to the start page if name is not set", async () => {
    await page.click("button[type=submit]");

    const url = await page.evaluate("location.href");
    expect(url).toBe("http://localhost:9000/");
  });

  it("should go to the game if name is set and GO! is clicked", async () => {
    await page.type("input[name=userName]", "Tatya");
    await page.click("button[type=submit]");

    const url = await page.evaluate("location.href");
    expect(url).toBe("http://localhost:9000/game");
  });
});
