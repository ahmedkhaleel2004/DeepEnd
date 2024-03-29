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
      className="grid grid-cols-1 gap-10 p-8 md:grid-cols-1 lg:grid-cols-2" // grid for different display types
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
