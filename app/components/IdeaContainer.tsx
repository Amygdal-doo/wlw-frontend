import { useNavigate } from "@remix-run/react";
import { IIdea } from "core/interfaces/ideas.interface";
import { Trash2Icon } from "lucide-react";
import Markdown from "markdown-to-jsx";
import { useChat } from "providers/ChatProvider";
import { useIdeas } from "providers/IdeasProvider";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { ROUTES } from "core/const/routes.enum";
import { ScrollArea } from "./ui/scroll-area";
interface IdeaContainerProps {
  idea: IIdea;
}

const IdeaContainer = ({ idea }: IdeaContainerProps) => {
  const { deleteIdeaById } = useIdeas();
  const { setMessages } = useChat();
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex h-[10vh] w-full items-center justify-between p-6">
        <SidebarTrigger />
        <div className="flex space-x-5">
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              await deleteIdeaById(idea._id);
              await navigate(ROUTES.CHAT);
            }}
          >
            <Trash2Icon />
          </Button>
          <Button
            onClick={() => {
              setMessages([]);
              navigate(ROUTES.CHAT);
            }}
            size="lg"
            className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
          >
            New Chat
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center border-y px-5">
        <ScrollArea className="h-[90vh] w-full max-w-xl overflow-y-auto">
          <div className="py-5">
            {idea.messages.map((message, index) => (
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
    </div>
  );
};

export default IdeaContainer;
