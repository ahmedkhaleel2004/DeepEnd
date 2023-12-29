import React, { useState } from "react";
import { Card } from "../../ui/card";
import { FormQuestion } from "./input-form";
import { auth, db } from "@/lib/firebase";
import questions from "@/lib/questions";
import { doc, setDoc, updateDoc } from "firebase/firestore";

interface SurveyQuestionsProps {
	onSurveyComplete: () => void;
}

const SurveyQuestions: React.FC<SurveyQuestionsProps> = ({
	onSurveyComplete,
}) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const currentQuestion = questions[currentQuestionIndex];

	const nextQuestion = () => {
		if (currentQuestionIndex < questions.length - 1) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		} else {
			onSurveyComplete();
		}
	};

	const userInput = async (userResponse: string) => {
		if (auth.currentUser) {
			// Create or update the document with the user's UID
			const docRef = doc(db, "questions", auth.currentUser.uid);

			// Prepare the update object
			let updateData: { [key: string]: string } = {};
			updateData[`Q${currentQuestionIndex + 1}`] = userResponse;

			// Update the document with the new response
			await setDoc(docRef, updateData, { merge: true });

			// Check if this was the last question
			if (currentQuestionIndex === questions.length - 1) {
				// Update the user document to indicate the survey is done
				const userDocRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userDocRef, {
					doneSurvey: true,
				});
			} else {
				// Move to the next question
				nextQuestion();
			}
		}
	};

	return (
		<Card className="p-4">
			<FormQuestion
				title={currentQuestion.title}
				placeholder={currentQuestion.placeholder}
				desc={currentQuestion.desc}
				onSuccessfulSubmit={nextQuestion}
				valueOfUser={userInput}
			/>
		</Card>
	);
};

export default SurveyQuestions;
