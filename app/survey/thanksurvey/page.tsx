import { ThankSurvey } from "@/components/component/thanks-survey";
import Navbar from "@/components/component/navbar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const ThanksSurvey = () => {
	return (
		<>
			<main>
				<Navbar />
				<Card className="flex flex-col justify-center items-center">
					<CardHeader>
						<div>
							<h1 className="text-3xl font-bold justify-center">
								Thank you!
							</h1>
							<p className="text-gray-500 dark:text-gray-400">
								Thank you for completing the survey. Below is a
								summary of your responses.
							</p>
						</div>
						<ThankSurvey />
					</CardHeader>
				</Card>
			</main>
		</>
	);
};

export default ThanksSurvey;
