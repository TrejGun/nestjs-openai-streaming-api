import { Injectable } from '@nestjs/common';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import type { Response } from 'express';
import { z } from 'zod';

import { MessageDto } from './dto';

@Injectable()
export class AppService {
  public chat(
    messages: Array<InstanceType<typeof MessageDto>>,
    res: Response,
  ): void {
    const model = openai('gpt-4o-mini');
    const stream = streamText({
      model,
      messages,
      tools: {
        answerToLife: tool({
          description: 'Gives you the answer to life',
          parameters: z.object({}),
          execute: async () => Promise.resolve({ answer: 69 }),
        }),
      },
      onError: console.error,
    });
    stream.pipeDataStreamToResponse(res);
  }
}
