import { Controller, Post, Body, Get, Res, Redirect } from '@nestjs/common';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import type { Response } from 'express';

import { ChatDto } from './app.dto';

@Controller()
export class AppController {
  @Get('/')
  @Redirect('/swagger', 301)
  public redirect(): void {
    // empty
  }

  @Post()
  async chat(
    @Body() { messages }: ChatDto,
    @Res() res: Response
  ): Promise<void> {
    const stream = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });
    stream.pipeDataStreamToResponse(res);
  }
}
