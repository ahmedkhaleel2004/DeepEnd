import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Make sure to replace 'your-api-key' with your actual OpenAI API key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

async function complete(userInput: string) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: userInput }],
    model: "gpt-4",
  });

  return completion.choices[0];
}

export async function POST(request: NextRequest) {
  const { userInput } = await request.json();
  const completion = await complete(userInput);
  return NextResponse.json(completion);
}