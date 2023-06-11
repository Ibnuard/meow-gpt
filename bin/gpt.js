const gptFunc = async (browser, message = "Halo", response) => {
  const page = await browser.newPage();

  await page.goto("https://chat.forefront.ai/", {
    waitUntil: "networkidle0",
  });

  const context = browser.defaultBrowserContext();
  await context.overridePermissions("https://chat.forefront.ai", [
    "clipboard-read",
    "clipboard-write",
  ]);

  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText(text) {
          this.text = text;
        },
      },
    })
  );

  async function copyContent() {
    await page.waitForSelector(
      ".opacity-100 > .flex > .relative:nth-child(3) > .flex > .cursor-pointer",
      { timeout: 5 * 60 * 1000 }
    );
    await page.click(
      ".opacity-100 > .flex > .relative:nth-child(3) > .flex > .cursor-pointer"
    );
  }

  try {
    console.log("try to find input");
    await page.waitForSelector(
      ".relative > .flex > .w-full > .text-th-primary-dark > div",
      {
        timeout: 10000,
        visible: true,
      }
    );
    console.log("found input");
    await page.click(
      ".relative > .flex > .w-full > .text-th-primary-dark > div"
    );
    await page.focus(
      ".relative > .flex > .w-full > .text-th-primary-dark > div"
    );
    await page.keyboard.type(message);
    await page.keyboard.press("Enter");
    await page.waitForSelector(
      "#__next > .flex > .relative > .relative > .w-full:nth-child(1) > div"
    );
    // find markdown list container
    const mdList = await page.$(
      "#__next > .flex > .relative > .relative > .w-full:nth-child(1) > div"
    );
  } catch (e) {
    await response("ERROR");
    return page.close();
  }

  // get latest markdown id
  let id = 4;
  (async () => {
    let itl;
    try {
      const selector = `div > .w-full:nth-child(${id}) > .flex > .flex > .post-markdown`;
      await page.waitForSelector(selector);
      const result = await page.$(selector);
      itl = setInterval(async () => {
        const text = await result?.evaluate((el) => {
          return el.textContent;
        });
      }, 100);
      if (!page) {
        return page.close();
      }
      await copyContent(page);
      const text = await page.evaluate(() => navigator.clipboard.text);
      await response(text);
      return page.close();
    } catch (e) {
      console.error(e);
      await response("ERROR");
      return page.close();
    } finally {
      if (itl) {
        clearInterval(itl);
      }
    }
  })().then();
  return;
};

module.exports = gptFunc;