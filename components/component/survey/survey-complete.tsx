import React from "react";
import { ThankSurvey } from "./thanks-survey";

const SurveyComplete = () => {
  return (
    <div>
      <h1 className="justify-center text-3xl font-bold">Thank you!</h1>
      <p className="text-muted-foreground">
        Thank you for completing the survey. Below is a summary of your
        responses.
      </p>
      <ThankSurvey />
    </div>
  );
};

export default SurveyComplete;
