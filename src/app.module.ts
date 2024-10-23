// src/app.module.ts
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TicketModule } from './ticket/ticket.module'; // Import your TicketModule

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    TicketModule, // Include your TicketModule here
  ],
})
export class AppModule {}
