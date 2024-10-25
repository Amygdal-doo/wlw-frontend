import { apiService } from "core/services/apiService";
import { SaveIcon } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { useChat } from "providers/ChatProvider";
import { useIdeas } from "providers/IdeasProvider";
import { ChatForm } from "./ChatForm";
import { useToast } from "hooks/use-toast";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const ChatContainer = () => {
  const { messages, setMessages } = useChat();
  const { fetchIdeas } = useIdeas();
  const { toast } = useToast();

  // Function to save the idea
  const saveIdea = async () => {
    try {
      await apiService.post("chat/save", messages);
      await fetchIdeas();

      toast({
        variant: "success",
        title: "Congratulations",
        description: "You have successfully save your idea!",
      });
    } catch (error) {
      console.error("Error saving idea:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <div>
      <div className="flex h-[10vh] w-full items-center justify-between p-6">
        <SidebarTrigger />
        <div className="flex space-x-5">
          {messages.length > 0 && (
            <Button variant="ghost" size="icon" onClick={() => saveIdea()}>
              <SaveIcon />
            </Button>
          )}
          <Button
            onClick={() => setMessages([])}
            size="lg"
            className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
          >
            {messages.length > 0 ? "Reset Chat" : "New Chat"}
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center border-y px-5">
        <ScrollArea className="h-[80vh] w-full max-w-2xl overflow-y-auto">
          <div className="py-5">
            {messages.map((message, index) => (
              <div
                key={index}
                className={` ${
                  message.role === "user"
                    ? "my-3"
                    : "flex flex-col rounded-md justify-center pt-5 leading-8 bg-gray-300"
                }`}
              >
                <div
                  className={` ${
                    message.role === "user" ? "font-medium" : "px-5 pb-5"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="flex h-[10vh] w-full items-center justify-center p-5">
        <ChatForm />
      </div>
    </div>
  );
};

export default ChatContainer;
