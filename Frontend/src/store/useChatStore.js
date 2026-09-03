import { create } from "zustand";
import { axiosInstance } from "../LIB/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getChats: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
  set({ isMessagesLoading: true });

  try {
    const res = await axiosInstance.get(`/messages/${userId}`);

    const messages = Array.isArray(res.data)
      ? res.data
      : res.data.messages || [];

    set({ messages });
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
    set({ messages: [] });
  } finally {
    set({ isMessagesLoading: false });
  }
},

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, 
    };
    
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: messages.concat(res.data) });
    } catch (error) {
      
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  deleteMessage: async (messageId) => {
  try {
    await axiosInstance.delete(`/messages/${messageId}`);

    set((state) => ({
      messages: state.messages.filter(
        (message) => message._id !== messageId
      ),
    }));

    toast.success("Message deleted");
  } catch (error) {
    toast.error(
      error.response?.data?.error || "Failed to delete message"
    );
  }
},
  subscribeToMessages: () => {
  const socket = useAuthStore.getState().socket;

  if (!socket) return;

  socket.on("newMessage", (newMessage) => {
    const currentMessages = get().messages
    set({
      messages: [...currentMessages, newMessage],
    });
  });

  socket.on("messageDeleted", (messageId) => {
    set((state) => ({
      messages: state.messages.filter(
        (message) => message._id !== messageId
      ),
    }));
  });
},
   unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}))




