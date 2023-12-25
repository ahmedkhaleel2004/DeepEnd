"use client";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import ProfileIcon from "../component/profile-icon"; // import ProfileIcon component
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

function useUser() {
	const [user, setUser] = useState(getAuth().currentUser);

	useEffect(() => {
		const unsubscribe = getAuth().onAuthStateChanged((user) => {
			setUser(user);
		});

		// Cleanup subscription on unmount
		return () => unsubscribe();
	}, []);

	return user;
}

interface NavbarProps {
	mainPage?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ mainPage = false }) => {
	const navItems = ["About", "Features", "Demo", "Contact"];
	const user = useUser(); // get the current user

	return (
		<div>
			<nav className="flex items-center justify-between p-3 w-full bg-transparent">
				<div className="mx-2">Logo</div>
				<div className="flex items-center justify-end space-x-4">
					{mainPage && (
						<div className="flex space-x-8">
							{navItems.map((item, index) => (
								<div key={index} className="text-center">
									{item}
								</div>
							))}
						</div>
					)}
					<ModeToggle />
					{mainPage ? (
						<div className="w-8"></div>
					) : (
						user && (
							<div className="w-12">
								<ProfileIcon />
							</div>
						)
					)}
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
