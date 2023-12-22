import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Linus",
	description: "Self-learning copilot for aspiring software engineers",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={"${inter.className} min-h-screen"}>
				{children}
			</body>
		</html>
	);
}
