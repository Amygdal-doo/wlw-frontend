import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService";
import { IIdea } from "core/interfaces/ideas.interface";
import { useAuth } from "./AuthProvider";
import { useToast } from "hooks/use-toast";

// Interface for the Ideas context
interface IIdeasContext {
  ideas: IIdea[];
  singleIdea: IIdea | undefined;
  loading: boolean;
  fetchIdeas: () => Promise<void>;
  fetchIdeaById: (id: string) => Promise<void>;
  deleteIdeaById: (id: string) => Promise<void>;
}

// Create a context for the Ideas provider
const IdeasContext = createContext<IIdeasContext | undefined>(undefined);

// Define the IdeasProvider component
export const IdeasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ideas, setIdeas] = useState<IIdea[]>([]); // Store the list of ideas
  const [singleIdea, setSingleIdea] = useState<IIdea | undefined>(); // Store the list of ideas
  const [loading, setLoading] = useState<boolean>(false); // Handles loading state
  const { user } = useAuth(); // Authenticated user from AuthProvider
  const { toast } = useToast();
  // Function to fetch a single idea by its ID
  const fetchIdeas = async (): Promise<void> => {
    setLoading(true);

    try {
      // Fetch the idea from the API using the provided ID
      if (user) {
        const response: AxiosResponse<IIdea[]> = await apiService.get(
          `chat/history`
        );

        if (response) {
          setIdeas(response.data); // Set the ideas data
        }
      }
    } catch (error) {
      console.error("Error fetching idea:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch a single idea by its ID
  const fetchIdeaById = async (id: string): Promise<void> => {
    setLoading(true);

    try {
      // Fetch the idea from the API using the provided ID
      if (user) {
        const response: AxiosResponse<IIdea> = await apiService.get(
          `chat/one/${id}`
        );

        if (response) {
          setSingleIdea(response.data); // Set the ideas data
        }
      }
    } catch (error) {
      console.error("Error fetching single idea:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an idea by its ID
  const deleteIdeaById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Send DELETE request to the API
      await apiService.delete(`chat/${id}`);

      await fetchIdeas();
    } catch (error) {
      console.error("Error deleting idea:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <IdeasContext.Provider
      value={{
        ideas,
        singleIdea,
        loading,
        fetchIdeas,
        fetchIdeaById,
        deleteIdeaById,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
};

// Custom hook to use the IdeasContext
export const useIdeas = (): IIdeasContext => {
  const context = useContext(IdeasContext);
  if (!context) {
    throw new Error("useIdeas must be used within an IdeasProvider");
  }
  return context;
};
