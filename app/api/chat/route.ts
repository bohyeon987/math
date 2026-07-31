import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini') as any,
      system: `You are a friendly and caring high school math teacher.
When a student asks a math question, explain it clearly and easily.
Use markdown or plain text neatly for math formulas, and show step-by-step solutions.
Maintain a warm tone that encourages students to think for themselves.
Politely decline non-math questions and guide them back to math.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat route:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
