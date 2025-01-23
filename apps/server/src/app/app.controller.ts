import { Body, Controller, Get, Post, Redirect, Res } from '@nestjs/common';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import type { Response } from 'express';
import { z } from 'zod';

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
      tools: {
        answerToLife: tool({
          description: 'Gives you the answer to life',
          parameters: z.object({}),
          execute: async () => Promise.resolve({ answer: 69 }),
        }),
      },
    });
    stream.pipeDataStreamToResponse(res);
  }
}
