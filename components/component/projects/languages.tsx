import React from "react";
import languageColors from "@/lib/language-colors";

interface LanguagesProps {
	languages: { [key: string]: string };
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
	return (
		<div className="space-x-4 w-full">
			{/* color bar */}
			<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 overflow-hidden">
				<div className="h-full flex">
					{Object.entries(languages).map(([lang, percent]) => {
						const color = languageColors[lang]?.color || "#ddd";
						const widthPercent = parseFloat(percent); // removes the % sign
						return (
							<div
								key={lang}
								style={{
									backgroundColor: color,
									width: `${widthPercent}%`,
								}}
								className={`h-full ${
									Object.keys(languages)[0] === lang
										? "rounded-l-full"
										: ""
								} ${
									Object.keys(languages)[
										Object.keys(languages).length - 1
									] === lang
										? "rounded-r-full"
										: ""
								}`}
							/>
						);
					})}
				</div>
			</div>

			{/* languages */}
			<div className="flex flex-col">
				{Object.entries(languages).map(([lang, percent]) => {
					const color = languageColors[lang]?.color || "#ddd";
					return (
						<div key={lang} className="flex items-center my-1">
							<span
								className="inline-block h-3 w-3 rounded-full"
								style={{ backgroundColor: color }}
							></span>
							<span className="ml-2 text-sm font-medium">
								{lang}
							</span>
							<span className="ml-auto">{percent}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Languages;
