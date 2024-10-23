// src/ticket/ticket.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from '@mathieuc/tradingview';
import { GetTicketPriceDto } from './dto/get-ticket-price.dto';

@Injectable()
export class TicketService {
  private client = new Client();
  private chart = new this.client.Session.Chart();

  constructor() {
    this.chart.onError((...err) => {
      console.error('Chart error:', ...err);
    });

    this.chart.onSymbolLoaded(() => {
      console.log(`Market "${this.chart.infos.description}" loaded!`);
    });
  }

  async getTicketPrice(getTicketPriceDto: GetTicketPriceDto) {
    this.client = new Client();
    this.chart = new this.client.Session.Chart();

    const { ticker, timeframe } = getTicketPriceDto;

    // Set the market for the chart
    this.chart.setMarket(ticker, {
      timeframe,
    });

    // Return a new promise that resolves when price data is available
    return new Promise((resolve, reject) => {
      // Clear any existing onUpdate listener (if applicable)
      this.chart.onUpdate(() => {
        if (!this.chart.periods[0]) {
          return reject(new Error('No price data available'));
        }

        const data = {
          data: {
            ticket: this.chart?.infos?.description,
            timeframe,
            currency_id: this.chart?.infos?.currency_id,
            open: this.chart?.periods[0]?.open,
            close: this.chart?.periods[0]?.close,
            max: this.chart?.periods[0]?.max,
            min: this.chart?.periods[0]?.min,
            volume: this.chart?.periods[0]?.volume,
          },
          timestamp: new Date().toISOString(),
        };
        resolve(data); // Resolve with the current price data
      });

      // Timeout to clean up the chart and client after a specified duration
      setTimeout(() => {
        console.log('\nClosing the chart...');
        this.chart.delete(); // Delete the chart to free resources
      }, 500); // Adjust as needed

      setTimeout(() => {
        console.log('\nClosing the client...');
        this.client.end(); // End the client connection
      }, 500); // Adjust as needed
    });
  }
}
