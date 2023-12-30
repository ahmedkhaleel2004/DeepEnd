import OpenAI from "openai";
import type { NextApiResponse } from "next";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextApiResponse) {
	const { description } = await req.json(); // accepts a description of the project
	console.log("POST: description", description);
	const response = await openai.images.generate({
		model: "dall-e-3",
		prompt: `IMPORTANT: dark blue and white theme. Create a very minimalist simple logo style, no text, show me the project: ${description}`,
		n: 1,
		size: "1024x1024",
	});
	console.log("response: ", response);
	res.status(200).json({ url: response.data[0].url });
}
