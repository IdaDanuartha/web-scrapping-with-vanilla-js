import puppeteer from 'puppeteer'

const url = "https://primakara.ac.id/blog"

const main = async() => {   
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)
    
    const allArticles = await page.evaluate(() => {
        const articles = document.querySelectorAll(".headline_small_secondary")

        return Array.from(articles).map((article) => {
            const category = article.querySelector(".headline_small_secondary__details .headline_small_secondary__details__category").innerText
            const title = article.querySelector(".headline_small_secondary__details .headline_small_secondary__details__paragraph").innerText
            return {
                category,
                title,
            }
        })
    })

    console.log(allArticles)

    await browser.close()
}

main() 