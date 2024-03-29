import React, { useEffect, useState, useCallback } from "react";
import { useChat, type Message } from "ai/react";
import ChatList from "./chat-list";
import EmptyScreen from "./empty-screen";
import ChatPanel from "./chat-panel";
import ChatScrollAnchor from "@/components/component/chatbot/chat-scroll-anchor";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";

export interface ChatProps extends React.ComponentProps<"div"> {
  initialMessages?: Message[];
  id?: string;
}

const Chat = ({ id, initialMessages }: ChatProps) => {
  const { messages, append, input, setInput, stop, reload, isLoading } =
    useChat({ initialMessages });

  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();

  const getConversationName = (messages: Message[]) => {
    return messages.length > 0 ? messages[0].content.substring(0, 50) : "";
  }; // gets the first 50 characters of the first message and sets it as the name of the chat

  // set messages in firestore
  const updateConversation = useCallback(
    async (messages: Message[]) => {
      // adds the messages to the chat
      if (!userId || messages.length === 0) return;
      const conversationRef = doc(db, "conversations", userId);

      const conversationData = {
        general: {
          [id?.toString() ?? ""]: {
            messages: messages,
            name: getConversationName(messages),
            timeUpdated: Timestamp.now(),
          },
        },
      };

      await setDoc(conversationRef, conversationData, { merge: true }); // add dat message
    },
    [userId, id],
  );

  const checkAndRedirect = useCallback(async () => {
    if (!userId || !id) return;
    const conversationRef = doc(db, "conversations", userId);
    const conversationSnap = await getDoc(conversationRef);
    if (conversationSnap.exists()) {
      const conversationData = conversationSnap.data();
      if (conversationData?.general?.[id]) {
        if (pathname !== `/chatbot/${id}`) {
          router.push(`/chatbot/${id}`, { scroll: false });
        }
      }
    }
  }, [userId, id, router]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  useEffect(() => {
    if (!isLoading) {
      updateConversation(messages);
      checkAndRedirect();
    }
  }, [messages, isLoading, checkAndRedirect, updateConversation]);

  return (
    <>
      <div className="flex grow flex-col">
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <div>
            <EmptyScreen setInput={setInput} />
          </div>
        )}
      </div>
      <div className="sticky bottom-5 z-10 w-full max-w-4xl py-6">
        <ChatPanel
          id={id}
          isLoading={isLoading}
          stop={stop}
          append={append}
          reload={reload}
          messages={messages}
          input={input}
          setInput={setInput}
        />
      </div>
    </>
  );
};

export default Chat;
