import React from "react";
import { InputForm } from "@/components/component/input-form";
import ProfileIcon from "@/components/component/profile-icon";
import { Card } from "@/components/ui/card";

const Survey = () => {
	return (
		<>
			<div className="flex justify-between items-center pr-4 pt-4">
				<div>Logo</div>
				<ProfileIcon />
			</div>
			<Card className="p-4 flex w-[40vh]">
				<InputForm />
			</Card>
		</>
	);
};

export default Survey;
