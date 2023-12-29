import React, { ReactNode } from "react";

interface GridContainerProps {
	children: ReactNode;
}

const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
	return <div className="grid grid-cols-2 gap-12">{children}</div>;
};

export default GridContainer;
