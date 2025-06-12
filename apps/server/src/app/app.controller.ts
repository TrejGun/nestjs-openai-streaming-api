import { Body, Controller, Get, Post, Redirect, Res } from '@nestjs/common';
import type { Response } from 'express';

import { ChatDto } from './dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Redirect('/swagger', 301)
  public redirect(): void {
    // empty
  }

  @Post('/')
  public chat(@Body() { messages }: ChatDto, @Res() res: Response): void {
    this.appService.chat(messages, res);
  }
}
