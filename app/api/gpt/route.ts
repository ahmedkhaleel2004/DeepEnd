import { NextResponse } from "next/server";
import OpenAI from "openai";

// Make sure to replace 'your-api-key' with your actual OpenAI API key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function complete() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "What is 1+1?" }],
    model: "gpt-4",
  });

  return completion.choices[0];
}

export async function GET() {
    const completion = await complete();
    return NextResponse.json(completion);
}