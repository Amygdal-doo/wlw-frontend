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

// Interface for the Ideas context
interface IIdeasContext {
  ideas: IIdea[];
  loading: boolean;
  fetchIdeaById: () => Promise<void>;
  deleteIdeaById: (id: string) => Promise<void>;
}

// Create a context for the Ideas provider
const IdeasContext = createContext<IIdeasContext | undefined>(undefined);

// Define the IdeasProvider component
export const IdeasProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ideas, setIdeas] = useState<IIdea[]>([]); // Store the list of ideas
  const [loading, setLoading] = useState<boolean>(false); // Handles loading state
  const { user } = useAuth(); // Authenticated user from AuthProvider

  // Function to fetch a single idea by its ID
  const fetchIdeaById = async (): Promise<void> => {
    setLoading(true);

    try {
      // Fetch the idea from the API using the provided ID
      if (user) {
        const response: AxiosResponse<IIdea[]> = await apiService.get(`idea`);

        if (response) {
          setIdeas(response.data); // Set the ideas data
        }
      }
    } catch (error) {
      console.error("Error fetching idea:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete an idea by its ID
  const deleteIdeaById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Send DELETE request to the API
      await apiService.delete(`idea/${id}`);

      await fetchIdeaById();
    } catch (error) {
      console.error("Error deleting idea:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IdeasContext.Provider
      value={{ ideas, loading, fetchIdeaById, deleteIdeaById }}
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
