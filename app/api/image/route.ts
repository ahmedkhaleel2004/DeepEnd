import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const { description } = await req.json(); // accepts a description of the project
	const response = await openai.images.generate({
		model: "dall-e-3",
		prompt: `IMPORTANT: dark blue and white theme. Create a very minimalist and simple logo with no text of a project whose description is: ${description}`,
		n: 1,
		size: "1024x1024",
	});
	return NextResponse.json(response.data[0].url);
}
