import React from "react";
import languageColors from "@/lib/language-colors";

interface LanguagesProps {
  languages: { [key: string]: string };
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  return (
    <div className="w-full">
      {/* color bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div className="flex h-full">
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
                  Object.keys(languages)[0] === lang ? "rounded-l-full" : ""
                } ${
                  Object.keys(languages)[Object.keys(languages).length - 1] ===
                  lang
                    ? "rounded-r-full"
                    : ""
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* languages */}
      <div className="mt-2 flex flex-wrap">
        {Object.entries(languages).map(([lang, percent]) => {
          const color = languageColors[lang]?.color || "#ddd";
          return (
            <div key={lang} className="my-1 mr-4 flex items-center">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <span className="ml-2 text-sm font-medium">
                {lang} - {percent}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Languages;
