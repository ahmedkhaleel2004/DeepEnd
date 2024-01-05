import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactDOM from "react-dom";

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	handleClose: () => void;
}

const Modal = ({ children, isOpen, handleClose }: ModalProps) => {
	const modalRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen && modalRef.current) {
			const focusableElements = modalRef.current.querySelectorAll(
				"a[href], button:not([disabled]), textarea, input, select"
			);
			if (focusableElements.length)
				(focusableElements[0] as HTMLElement).focus();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return ReactDOM.createPortal(
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
		</motion.div>,
		document.body
	);
};

export default Modal;
