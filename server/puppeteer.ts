import puppeteer from 'npm:puppeteer';

export class Browser {
  browser: puppeteer.Browser | null;
  page: puppeteer.Page | null;
  socketId: string;

  constructor(socketId: string) {
    this.browser = null;
    this.page = null;
    this.socketId = socketId;
  }

  async create() {
    const browser = await puppeteer.launch();
    this.browser = browser;

    const page = await browser.newPage();

    page.setViewport({ width: 3840, height: 2160 });

    await page.goto(`http://localhost:3000/viewer?socketId=${this.socketId}`);
    await page.waitForNetworkIdle();

    this.page = page;
  }

  async screenshot(fileName: string) {
    if (this.page) {
      await this.page.screenshot({
        path: `out/${fileName}`,
        omitBackground: true,
        type: 'png',
      });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }
}
