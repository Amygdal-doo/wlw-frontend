import { useNavigate, useParams } from "@remix-run/react";
import AppSidebar from "~/components/AppSidebar";
import IdeaContainer from "~/components/IdeaContainer";
import { ROUTES } from "core/const/routes.enum";
import useToken from "core/hooks/useToken";
import { useAuth } from "providers/AuthProvider";
import { useIdeas } from "providers/IdeasProvider";
import { useEffect } from "react";
import { SidebarProvider } from "~/components/ui/sidebar";

export default function SingleIdeaPage() {
  const { ideas, singleIdea, fetchIdeaById, fetchIdeas } = useIdeas();
  const params = useParams();
  const { token } = useToken();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch idea when the component is mounted
  useEffect(() => {
    if (token && params.idea) {
      fetchIdeaById(params.idea);
      fetchIdeas();
    } else {
      navigate(ROUTES.HOME);
    }
  }, [params.idea, user]);

  return (
    <SidebarProvider>
      <AppSidebar ideas={ideas} />
      <main className="w-full">
        {singleIdea && <IdeaContainer idea={singleIdea} />}
      </main>
    </SidebarProvider>
  );
}
