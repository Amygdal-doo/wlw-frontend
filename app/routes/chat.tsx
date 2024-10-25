import { useNavigate } from "@remix-run/react";
import AppSidebar from "~/components/AppSidebar";
import ChatContainer from "~/components/ChatContainer";
import { ROUTES } from "core/const/routes.enum";
import useToken from "core/hooks/useToken";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";
import { useEffect } from "react";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function ChatPage() {
  const { ideas, fetchIdeas } = useIdeas();
  const { user } = useAuth();
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchIdeas();
    } else {
      navigate(ROUTES.HOME);
    }
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
