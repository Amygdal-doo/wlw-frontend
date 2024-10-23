import { AxiosResponse } from "axios";
import { apiService } from "core/services/apiService";
import { SaveIcon } from "lucide-react";
import Markdown from 'markdown-to-jsx';
import { useChat } from "providers/ChatProvider";
import { useIdeas } from "providers/IdeasProvider";
import { useState } from "react";
import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { SidebarTrigger } from "../sidebar";
import { ChatForm } from "./ChatForm";

const ChatContainer = () => {
  const { messages, setMessages } = useChat();
  const { fetchIdeas } = useIdeas();

  // Local state to track saved ideas for each message
  const [savedIdeas, setSavedIdeas] = useState<boolean[]>(
    Array(messages.length).fill(false)
  );

  // Function to save the idea
  const saveIdea = async (content: string, index: number) => {
    try {
      const data = {
        content,
      };
      const response: AxiosResponse = await apiService.post("idea", data);
      await fetchIdeas();

      // Update local saved ideas state
      setSavedIdeas((prev) => {
        const updated = [...prev];
        updated[index] = true; // Mark this idea as saved
        return updated;
      });

      console.log("Idea saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  // Function to handle idea click and toggle saved state
  const handleIdeaClick = (content: string, index: number) => {
    if (savedIdeas[index]) {
      // Idea already saved, handle accordingly (e.g., delete or notify)
      console.log("Idea already saved:", content);
    } else {
      // Save the idea
      saveIdea(content, index);
    }
  };

  return (
    <div>
      <div className="flex h-[10vh] w-full items-center justify-between p-6">
        <SidebarTrigger />
        <Button
          onClick={() => setMessages([])}
          size="lg"
          className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
        >
          New Chat
        </Button>
      </div>
      <div className="w-full flex justify-center border-y px-5">
        <ScrollArea className="h-[80vh] w-full max-w-2xl">
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
                {message.role === "assistant" && !savedIdeas[index] && (
                  <div className="justify-end w-full pr-2 -mt-3 flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleIdeaClick(message.content, index)}
                    >
                      <SaveIcon />
                    </Button>
                  </div>
                )}
                <p
                  className={` ${
                    message.role === "user" ? "font-medium" : "px-5 pb-5"
                  }`}
                >
                  <Markdown>{message.content}</Markdown>
                </p>
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
