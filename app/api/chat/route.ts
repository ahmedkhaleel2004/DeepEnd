import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
	console.log("hello from api!");
	const { messages } = await req.json();

	// Ask OpenAI for a streaming chat completion given the prompt
	const response = await openai.chat.completions.create({
		model: "gpt-4-1106-preview",
		stream: true,
		messages,
	});

	// Convert the response into a friendly text-stream
	const stream = OpenAIStream(response, {
		async onCompletion(completion) {
			const payload = {
				messages: [
					...messages,
					{
						content: completion,
						role: "assistant",
					},
				],
			};
		},
	});
	// Respond with the stream
	return new StreamingTextResponse(stream);
}
