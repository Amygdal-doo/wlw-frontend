import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AxiosResponse } from "axios";
import { SidebarProvider } from "components/ui/sidebar";
import AppSidebar from "components/ui/ui/AppSidebar";
import ChatContainer from "components/ui/ui/ChatContainer";
import { IIdea } from "core/interfaces/ideas.interface";
import { apiService } from "core/services/apiService";

type LoaderData = {
  ideas: IIdea[];
};

// Loader function to fetch ideas
export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  try {
    // Explicitly typing the API response as AxiosResponse<IIdea[]>
    const response: AxiosResponse<IIdea[]> = await apiService.get("idea");

    // Check if response exists and has data
    if (!response || !response.data) {
      throw new Error("Failed to fetch ideas");
    }

    // Return the ideas data
    return { ideas: response.data }; // Correctly typed as IIdea[]
  } catch (error) {
    console.error("Error loading ideas:", error);
    throw new Response("Failed to load ideas", { status: 500 });
  }
};

export default function ChatPage() {
  const { ideas } = useLoaderData<LoaderData>();
  return (
    <SidebarProvider>
      <AppSidebar ideas={ideas} />
      <main className="w-full">
        <ChatContainer />
      </main>
    </SidebarProvider>
  );
}
