"use client";

import { PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const transitionDebug = {
  type: "easeOut",
  duration: 0.2,
};

export default function TextMorph({
  params,
}: {
  params: { conversationId: string };
}) {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-[300px] flex-col items-end justify-end pb-4">
      <AnimatePresence mode="wait">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            className="z-10 mt-2 max-w-[250px] break-words rounded-2xl bg-gray-200 dark:bg-gray-800"
            layoutId={`container-[${messages.length - 1}]`}
            transition={transitionDebug}
          >
            <div className="px-3 py-2 text-[15px] leading-[15px] text-gray-900 dark:text-gray-100">
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="fixed bottom-0 mt-4 flex w-full">
  <form onSubmit={handleSubmit} className="flex w-full">
    <input
      type="text"
      onChange={(e) => setNewMessage(e.target.value)}
      value={newMessage}
      className="py- relative h-9 w-[250px] flex-grow rounded-full border border-gray-200 bg-white px-3 text-[15px] outline-none placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-blue-500/20 focus-visible:ring-offset-1
      dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus-visible:ring-blue-500/20 dark:focus-visible:ring-offset-1 dark:focus-visible:ring-offset-gray-700
      "
      placeholder="Type your message"
    />
    <motion.div
      key={messages.length}
      layout="position"
      className="pointer-events-none absolute z-10 flex h-9 w-[250px] items-center overflow-hidden break-words rounded-full bg-gray-200 [word-break:break-word] dark:bg-gray-800"
      layoutId={`container-[${messages.length}]`}
      transition={transitionDebug}
      initial={{ opacity: 0.6, zIndex: -1 }}
      animate={{ opacity: 0.6, zIndex: -1 }}
      exit={{ opacity: 1, zIndex: 1 }}
    >
      <div className="px-3 py-2 text-[15px] leading-[15px] text-gray-900 dark:text-gray-100">
        {newMessage}
      </div>
    </motion.div>
    <button
      type="submit"
      className="ml-2 flex h-9 w-9 items-center justify-center rounded-full bg-gray-200
      dark:bg-gray-800"
    >
      <PlusIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    </button>
  </form>
</div>
    </div>
  );
}
