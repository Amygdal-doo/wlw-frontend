import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService";
import { useToast } from "hooks/use-toast";
import { IInstruction } from "core/interfaces/instructions.interface";

interface ISettingsContext {
  instructions: IInstruction | null;
  fetchInstructions: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<ISettingsContext | undefined>(undefined);

export const SettingsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [instructions, setInstructions] = useState<IInstruction | null>(null); // State for instructions
  const [loading, setLoading] = useState<boolean>(false); // Loading state for API calls
  const { toast } = useToast(); // Toast for showing notifications

  // Function to fetch instructions from the API
  const fetchInstructions = async () => {
    setLoading(true);

    try {
      // Make the API request to fetch instructions
      const response: AxiosResponse = await apiService.get("/instructions");

      // Assuming the response contains the instruction data
      const instructionData: IInstruction = response.data;

      // Set the fetched instructions in state
      setInstructions(instructionData);
    } catch (error) {
      console.error("Error fetching instructions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load instructions.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        instructions,
        fetchInstructions,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Custom hook to use the SettingsContext
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
