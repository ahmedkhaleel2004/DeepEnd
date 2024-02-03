"use client";

import { Label } from "@radix-ui/react-dropdown-menu";
import { nanoid } from "@/lib/utils";
import Chat from "@/components/component/chatbot/chat";

const Chatbot = () => {
  const id = nanoid(); //creating an id

  return (
    <main className="flex h-full justify-center">
      <div className="w-[80%] max-w-4xl">
        <div className="flex h-full flex-col justify-between">
          <header className="my-4">
            <h1 className="text-3xl font-bold">Chatbot</h1>
            <Label>Interact with Linus!</Label>
          </header>
          <Chat id={id} />
        </div>
      </div>
    </main>
  );
};

export default Chatbot;
