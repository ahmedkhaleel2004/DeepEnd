import React from "react";
import { ThankSurvey } from "./thanks-survey";

const SurveyComplete = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold justify-center">Thank you!</h1>
			<p className="text-gray-500 dark:text-gray-400">
				Thank you for completing the survey. Below is a summary of your
				responses.
			</p>
			<ThankSurvey />
		</div>
	);
};

export default SurveyComplete;
