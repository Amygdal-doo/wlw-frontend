import { SidebarProvider } from "components/ui/sidebar";
import AppSidebar from "components/ui/ui/AppSidebar";
import ChatContainer from "components/ui/ui/ChatContainer";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";
import { useEffect } from "react";

export default function ChatPage() {
  const { ideas, fetchIdeas } = useIdeas();
  const { user } = useAuth();

  useEffect(() => {
    fetchIdeas();
  }, [user]);

  return (
    <SidebarProvider>
      <AppSidebar ideas={ideas} />
      <main className="w-full">
        <ChatContainer />
      </main>
    </SidebarProvider>
  );
}
