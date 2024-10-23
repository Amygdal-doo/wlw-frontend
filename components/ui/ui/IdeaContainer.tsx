import { Button } from "../button";
import { ScrollArea } from "../scroll-area";
import { SidebarTrigger } from "../sidebar";
import { Trash2Icon } from "lucide-react";
import { useIdeas } from "providers/IdeasProvider";
import { useNavigate } from "@remix-run/react";
import { IIdea } from "core/interfaces/ideas.interface";
import { useChat } from "providers/ChatProvider";

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
        <Button
          onClick={() => {
            setMessages([]);
            navigate("/chat");
          }}
          size="lg"
          className="flex justify-center font-semibold text-base border text-black bg-gray-300 hover:bg-black/[0.2]"
        >
          New Chat
        </Button>
      </div>
      <div className="w-full flex justify-center border-y px-5">
        <ScrollArea className="h-[90vh] w-full max-w-xl">
          <div className="py-5 w-full">
            <div className="flex flex-col rounded-md justify-center pt-5 leading-8 bg-gray-300">
              <div className="justify-end w-full pr-2 -mt-3 flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    deleteIdeaById(idea._id);
                    navigate("/chat");
                  }}
                >
                  <Trash2Icon />
                </Button>
              </div>

              <p className="px-5 pb-5">{idea.content}</p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default IdeaContainer;