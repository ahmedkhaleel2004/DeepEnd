import React from "react";
import { InputForm } from "@/components/component/input-form";
import ProfileIcon from "@/components/component/profile-icon";

const Survey = () => {
	return (
		<>
			<div className="flex justify-between items-center pr-4 pt-4">
				<div>Logo</div>
				<ProfileIcon />
			</div>
			<InputForm />
		</>
	);
};

export default Survey;
