import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer';

@Injectable()
export class AmazonService {
  constructor(private readonly configService: ConfigService) {}

  
  async getProducts(prod: string) {
    const browser = await puppeteer.launch({
        headless: true,
    });
    try{
        const page = await browser.newPage();

    // Navigate the page to a URL
    await Promise.all([
        page.waitForNavigation(),
        page.goto('https://www.amazon.com/s?k=rubik%27s+cube&ref=nb_sb_noss'),
      ]);

    return await page.$$eval(
        '.s-search-results .s-card-container',
        (resultItems) => {
          return resultItems.map((resultItem) => {
            const url = resultItem.querySelector('a').href;
            const title = resultItem.querySelector(
              '.s-title-instructions-style span',
            )?.textContent;
            const amountRate = resultItem.querySelector('.a-spacing-top-micro .s-csa-instrumentation-wrapper .a-link-normal span',)?.textContent
            return {
              url,
              title,
              amountRate
            };
          });
        },
    );
    }finally {
        await browser.close();
      }
  }
}