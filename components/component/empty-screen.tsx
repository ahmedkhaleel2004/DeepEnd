import { UseChatHelpers } from "ai/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";
// import { IconArrowRight } from "@/components/ui/icons";

// const exampleMessages = [
// 	{
// 		heading: "Explain technical concepts",
// 		message: `What is a "serverless function"?`,
// 	},
// 	{
// 		heading: "Summarize an article",
// 		message: "Summarize the following article for a 2nd grader: \n",
// 	},
// 	{
// 		heading: "Draft an email",
// 		message: `Draft an email to my boss about the following: \n`,
// 	},
// ];

function EmptyScreen({ setInput }: Pick<UseChatHelpers, "setInput">) {
	return (
		<div>
			<h1 className=" text-2xl">General Conversation</h1>
		</div>
	);
}

export default EmptyScreen;
