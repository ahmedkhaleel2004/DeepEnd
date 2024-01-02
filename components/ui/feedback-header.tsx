import React, { useState } from "react";
import { Button } from "./button";

function FeedbackForm() {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		try {
			const response = await fetch("/api/send-feedback", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, message }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			// Clear the form
			setEmail("");
			setMessage("");

			alert("Email sent successfully!");
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="col-span-1">
			<p className="text-lg mb-4">Send Us Feedback</p>
			<form
				onSubmit={handleSubmit}
				className="bg-background/80 rounded-xl h-68"
			>
				<div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Your email"
						required
						className="w-full mt-5 pl-1 bg-transparent border border-gray-300 rounded-lg h-8"
					/>
				</div>
				<div>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Your message"
						required
						className="w-full h-32 mt-10 pl-1 bg-transparent border border-gray-300 rounded-lg"
					/>
				</div>
				<div className="text-right">
					<Button
						className="   mt-4 h-12 w-32 rounded text-sm"
						type="submit"
					>
						Send Feedback
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FeedbackForm;
