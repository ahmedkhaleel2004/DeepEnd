import React from "react";
import { motion } from "framer-motion";

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3, ease: "backOut" }}
			className="fixed inset-0 flex items-center justify-center bg-zinc-950 bg-opacity-50"
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.8 }}
				transition={{ duration: 0.3, ease: "backOut" }}
				className="min-w-64"
			>
				{children}
			</motion.div>
		</motion.div>
	);
};

export default Modal;
