import {
  createContext,
  useContext,
  useState,
  FC,
  PropsWithChildren,
} from "react";
import { AxiosResponse } from "axios";
import { apiService } from "../core/services/apiService";
import { IMessage } from "core/interfaces/message.interface";

interface IChatContext {
  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;
  loading: boolean;
  sendMessage: (content: string) => Promise<void>;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]); // Stores all messages
  const [loading, setLoading] = useState<boolean>(false); // Handles loading state during message posting

  // Function to send a message
  const sendMessage = async (content: string) => {
    setLoading(true);

    // Prepare the initial message structure
    const newMessage: IMessage = { role: "user", content };

    try {
      // Send the user's message to the API
      const response: AxiosResponse = await apiService.post(`chat`, {
        messages: messages, // Send the chat history
        message: newMessage, // Include the new message
      });

      console.log("chat response", response);
      //   // Assuming the response contains the assistant's reply and updated message history
      // Assuming the response contains the assistant's reply and updated message history
      const { messages: updatedMessages } = response.data;

      // Update the state to reflect the entire message history from the API response
      setMessages(updatedMessages); // Set the messages from the response
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessages,
        loading,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use the ChatContext
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
