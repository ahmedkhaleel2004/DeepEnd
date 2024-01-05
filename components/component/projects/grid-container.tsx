import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface GridContainerProps {
	children: ReactNode;
}

const containerVariants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const childVariants = {
	hidden: { y: -20, opacity: 0 },
	show: { y: 0, opacity: 1 },
};

const GridContainer: React.FC<GridContainerProps> = ({ children }) => {
	return (
		<motion.div
			className="grid grid-cols-2 p-12 gap-12 md:grid-cols-1"
			variants={containerVariants}
			initial="hidden"
			animate="show"
		>
			{React.Children.map(children, (child) => (
				<motion.div variants={childVariants}>{child}</motion.div>
			))}
		</motion.div>
	);
};

export default GridContainer;
