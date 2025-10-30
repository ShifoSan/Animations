import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Get the absolute path to the HTML file
        file_path = os.path.abspath('index.html')

        await page.goto(f'file://{file_path}')

        # Wait for the initial animation
        await page.wait_for_timeout(2000)
        await page.screenshot(path='jules-scratch/verification/0_intro.png')

        planets = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']

        for i, planet in enumerate(planets):
            await page.evaluate(f"document.getElementById('{planet}').scrollIntoView()")
            await page.wait_for_timeout(1000)
            await page.screenshot(path=f'jules-scratch/verification/{i+1}_{planet}.png')

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
