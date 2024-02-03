"use client";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// this needs a lot of work

export function ThankSurvey() {
  const router = useRouter();

  const nextPage = () => {
    router.push("/projects");
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Submitted Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Name</span>
            <span className="text-gray-500">{}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium"></span>
            <span className="text-gray-500">{}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium">Question 3</span>
            <span className="text-gray-500">{}</span>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center justify-center">
        <Button variant="outline" onClick={nextPage}>
          Go To Projects
        </Button>
      </div>
      <div className="rounded-md bg-green-100 p-4 text-green-900">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                clipRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <p className="ml-3">
            Your responses have been successfully submitted.
          </p>
        </div>
      </div>
    </div>
  );
}
