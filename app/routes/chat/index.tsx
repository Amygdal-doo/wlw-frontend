import { SidebarProvider } from "components/ui/sidebar";
import AppSidebar from "components/ui/ui/AppSidebar";
import ChatContainer from "components/ui/ui/ChatContainer";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";
import { useEffect } from "react";

export default function ChatPage() {
  const { ideas, fetchIdeaById } = useIdeas();
  const { user } = useAuth();

  // Fetch idea when the component is mounted
  useEffect(() => {
    fetchIdeaById(); // Call fetchIdeaById when the component mounts
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
