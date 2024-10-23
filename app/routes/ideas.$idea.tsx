import { useParams } from "@remix-run/react";
import { SidebarProvider } from "components/ui/sidebar";
import AppSidebar from "components/ui/ui/AppSidebar";
import IdeaContainer from "components/ui/ui/IdeaContainer";
import { useIdeas } from "providers/IdeasProvider";
import { useEffect } from "react";

export default function SingleIdeaPage() {
  const { ideas, singleIdea, fetchIdeaById } = useIdeas();
  const params = useParams();

  // Fetch idea when the component is mounted
  useEffect(() => {
    if (params.idea) {
      fetchIdeaById(params.idea);
    } // Call fetchIdeaById when the component mounts
  }, [params.idea]);

  return (
    <SidebarProvider>
      <AppSidebar ideas={ideas} />
      <main className="w-full">
        {singleIdea && <IdeaContainer idea={singleIdea} />}
      </main>
    </SidebarProvider>
  );
}
