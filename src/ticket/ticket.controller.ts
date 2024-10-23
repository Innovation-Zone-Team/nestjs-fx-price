// src/ticket/ticket.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { GetTicketPriceDto } from './dto/get-ticket-price.dto';

@Controller('ticker')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get('price')
  async getTicketPrice(@Query() getTicketPriceDto: GetTicketPriceDto) {
    return this.ticketService.getTicketPrice(getTicketPriceDto);
  }
}
