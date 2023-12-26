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
		<div className="">
			<Card className="max-w-sm dark:bg-zinc-800 mx-auto flex flex-col items-center">
				<CardHeader>
					<CardTitle>General Conversation</CardTitle>
				</CardHeader>
				<CardContent>
					Ask Linus about your journey in software engineering.
				</CardContent>
			</Card>
		</div>
	);
}

export default EmptyScreen;
