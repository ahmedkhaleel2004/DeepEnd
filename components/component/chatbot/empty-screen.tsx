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
    <div className="flex justify-center pt-[25vh]">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl text-muted-foreground">General Conversation</h1>
        <h2 className="pt-2 text-xl text-muted-foreground">
          Ask Linus about your journey in Software Engineering
        </h2>
      </div>
    </div>
  );
}

export default EmptyScreen;
