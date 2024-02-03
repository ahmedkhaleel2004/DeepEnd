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
      className="mb-2 flex items-center rounded-md p-2 pb-0 pt-0 duration-200  hover:bg-zinc-300 dark:hover:bg-zinc-700"
    >
      <Link href={`/chatbot/${id}`} className=" flex grow items-center">
        <div className="flex w-full items-center gap-2">
          <ChatBubbleIcon />
          <div className="relative max-h-5 w-10 flex-1 select-none overflow-hidden text-ellipsis break-all">
            <span className="whitespace-nowrap">{name}</span>
          </div>
        </div>
      </Link>
      <div
        className="cursor-pointer rounded-md p-1 duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-500"
        onClick={() => deleteConversation()}
      >
        <TrashIcon />
      </div>
    </AccordionContent>
  );
};

export default ConversationItem;
