import { AccordionContent } from "@/components/ui/accordion";
import { db } from "@/lib/firebase";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { TrashIcon } from "@radix-ui/react-icons";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface ConversationItemProps {
	conversation: Conversation;
	userId: string;
}

interface Conversation {
	id: string;
	name: string;
	timeUpdated: Date;
}

const ConversationItem = ({ conversation, userId }: ConversationItemProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const { id, name } = conversation;

	const deleteConversation = async () => {
		const userDocRef = doc(db, "conversations", userId);
		await updateDoc(userDocRef, {
			[`general.${id}`]: deleteField(),
		});
		if (pathname === `/chatbot/${id}`) {
			router.push("/chatbot");
		}
	};

	return (
		<AccordionContent
			key={id}
			className="pb-0 pt-0 p-2 mb-2 flex items-center hover:bg-zinc-300 dark:hover:bg-zinc-700  rounded-md duration-200"
		>
			<Link href={`/chatbot/${id}`} className=" flex grow items-center">
				<div className="flex items-center w-full gap-2">
					<ChatBubbleIcon />
					<div className="relative max-h-5 w-10 flex-1 select-none overflow-hidden text-ellipsis break-all">
						<span className="whitespace-nowrap">{name}</span>
					</div>
				</div>
			</Link>
			<div
				className="hover:bg-zinc-50 dark:hover:bg-zinc-500 rounded-md duration-200 cursor-pointer p-1"
				onClick={() => deleteConversation()}
			>
				<TrashIcon />
			</div>
		</AccordionContent>
	);
};

export default ConversationItem;
