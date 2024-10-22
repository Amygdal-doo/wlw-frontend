import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { SidebarTrigger } from "../sidebar";
import { ChatForm } from "./ChatForm";

const ChatContainer = () => {
  return (
    <div>
      <div className="flex h-[10vh] w-full items-center justify-between p-6">
        <SidebarTrigger />
        <Button
          size="lg"
          className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
        >
          New Chat
        </Button>
      </div>
      <div className="w-full flex justify-center border-y px-5">
        <ScrollArea className="h-[80vh] max-w-xl"></ScrollArea>
      </div>
      <div className="flex h-[10vh] w-full items-center justify-center p-5">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatContainer;
