import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function thankSurvey() {
	return (
		<div className="space-y-8">
			<div className="space-y-2">
				<h2 className="text-3xl font-bold">Submission Completed</h2>
				<p className="text-gray-500 dark:text-gray-400">
					Thank you for completing the questionnaire. Below is a
					summary of your responses.
				</p>
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Submitted Information</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between">
						<span className="font-medium">Name</span>
						<span className="text-gray-500">John Doe</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-medium">Email</span>
						<span className="text-gray-500">
							johndoe@example.com
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="font-medium">Occupation</span>
						<span className="text-gray-500">Software Engineer</span>
					</div>
				</CardContent>
			</Card>
			<div className="flex items-center justify-center">
				<Button variant="outline">Download Summary</Button>
			</div>
			<div className="p-4 bg-green-100 text-green-900 rounded-md">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
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
