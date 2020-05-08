const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox', '--ignore-certificate-errors'] })
    const page = await browser.newPage()
    await page.goto('https://www.kuaidi100.com/', { timeout: 0, waitUntil: 'networkidle2' }) // 557006432812950
    const input = await page.$('#postid')
    await input.type(process.argv.slice(2)[0] || '557006432812950')
    const query = await page.$('#query')
    await query.click()
    page.on('response', async res => {
        if (res._url.includes('/query')) {
            console.log(JSON.parse(await res.text()))
            await page.close()
            await browser.close()
        }
    })
})();