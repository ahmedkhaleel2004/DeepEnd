import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center animate-fade-in bg-zinc-950 bg-opacity-50">
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Modal;
