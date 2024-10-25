import { Link, useNavigate, useParams } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Brain, ChevronUp, MoreHorizontal } from "lucide-react";
import { IIdea } from "core/interfaces/ideas.interface";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";
import { ROUTES } from "core/const/routes.enum";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { CustomizeChatAIDialog } from "./CustomizeChatAIDialog";

interface AppSidebarProps {
  ideas: IIdea[];
}

const AppSidebar = ({ ideas }: AppSidebarProps) => {
  const { logout, user } = useAuth();
  const { deleteIdeaById } = useIdeas();
  const params = useParams();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Link to={ROUTES.CHAT}>
            <SidebarGroupLabel className="h-[8vh] bg-gray-300 px-5">
              Chat AI
            </SidebarGroupLabel>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {ideas.map((idea) => (
                <SidebarMenuItem key={idea._id}>
                  <SidebarMenuButton asChild>
                    <Link to={`${ROUTES.IDEAS}/${idea._id}`}>
                      <Brain />
                      <span>{idea.messages[0].content}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="right" align="start">
                      <DropdownMenuItem
                        onClick={async () => {
                          await deleteIdeaById(idea._id);
                          if (params.idea) {
                            await navigate(ROUTES.CHAT);
                          }
                        }}
                      >
                        <span>Delete Idea</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {user?.username}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>{user?.email}</span>
                </DropdownMenuItem>
                <CustomizeChatAIDialog />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                  }}
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
