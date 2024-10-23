import { Link } from "@remix-run/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
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
} from "../sidebar";

import { Brain, ChevronUp, MoreHorizontal } from "lucide-react";
import { IIdea } from "core/interfaces/ideas.interface";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";

interface AppSidebarProps {
  ideas: IIdea[];
}

const AppSidebar = ({ ideas }: AppSidebarProps) => {
  const { logout, user } = useAuth();
  const { deleteIdeaById } = useIdeas();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-[8vh] bg-gray-300 px-5">
            Chat AI
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ideas.map((idea) => (
                <SidebarMenuItem key={idea._id}>
                  <SidebarMenuButton asChild>
                    <Link to="/">
                      <Brain />
                      <span>{idea.content}</span>
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
                        onClick={() => deleteIdeaById(idea._id)}
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
