"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@radix-ui/react-dropdown-menu";
import Chat from "@/components/component/chatbot/chat";
import { type Message } from "ai";

const getChat = async (chatID: string, userID: string) => {
  const conversationRef = doc(db, "conversations", userID);
  const conversationSnap = await getDoc(conversationRef);
  if (conversationSnap.exists()) {
    const conversationData = conversationSnap.data();
    if (conversationData?.general?.[chatID]) {
      return conversationData?.general?.[chatID];
    }
  }
  return null;
};

const ChatwithID = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const chatId = pathname.split("/")[2];
  const [chat, setChat] = useState<Message[] | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        getChat(chatId, user.uid).then((chatData) => {
          if (chatData) {
            setChat(chatData.messages);
          } else {
            router.push("/chatbot");
          }
        });
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, [chatId, router]);

  return (
    <main className="flex h-full justify-center">
      <div className="w-[80%] max-w-4xl">
        <div className="flex h-full flex-col">
          <header className="my-4">
            <h1 className="text-3xl font-bold">Chatbot</h1>
            <Label>Interact with Linus!</Label>
          </header>
          <Chat id={chatId} initialMessages={chat} />
        </div>
      </div>
    </main>
  );
};

export default ChatwithID;
