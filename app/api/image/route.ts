import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
	const { name, desc, points } = await req.json();
	const pointsObj = JSON.parse(points);
	let bulletPoints = "";
	if (
		pointsObj &&
		pointsObj.bullet_points &&
		pointsObj.bullet_points.length > 0
	) {
		bulletPoints =
			"The project has the following key points: \n" +
			pointsObj.bullet_points.join("\n");
	}
	const response = await openai.images.generate({
		model: "dall-e-3",
		prompt: `IMPORTANT: dark blue and white theme. 
		Create a very minimalist and simple logo with no text of a project named ${name}. 
		${desc ? "The project has a description of: " + desc : ""}. 
		${bulletPoints}`,
		n: 1,
		size: "1024x1024",
		response_format: "b64_json",
	});
	return NextResponse.json(response.data[0].b64_json);
}
