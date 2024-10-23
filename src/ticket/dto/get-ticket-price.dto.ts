// src/ticket/dto/get-ticket-price.dto.ts
import { IsString, IsIn } from 'class-validator';

export class GetTicketPriceDto {
  @IsString()
  ticker: string;

  @IsString()
  @IsIn(['5', '15', '60', '240']) // Ensure timeframe is one of the allowed values
  timeframe: string;
}
