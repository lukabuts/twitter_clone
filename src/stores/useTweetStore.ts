import { api } from "@/lib";
import { create } from "zustand";

interface TweetStore {
  tweetsData: TweetData;
  tweet: Tweet | null;
  isLoading: boolean;
  isCreating: boolean;
  error: string | null;
  fetchTweets: (page: number) => Promise<void>;
  getTweet: (slug: string) => Promise<void>;
  createTweet: (
    formData: FormData,
    config?: {
      onUploadProgress?: (
        progressEvent: import("axios").AxiosProgressEvent
      ) => void;
    }
  ) => Promise<void>;
  resetError: () => void;
}

export const useTweetStore = create<TweetStore>((set, get) => ({
  tweetsData: {
    current_page: 1,
    data: [],
    current_page_url: "",
    first_page_url: "",
    from: 0,
    next_page_url: null,
    path: "",
    per_page: 0,
    prev_page_url: null,
    to: 0,
  },
  tweet: null,
  isLoading: false,
  isCreating: false,
  error: null,

  fetchTweets: async (page) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<TweetData>(`/tweets?page=${page}`);
      set({
        tweetsData: {
          ...response.data,
          data:
            page === 1
              ? response.data.data
              : [...get().tweetsData.data, ...response.data.data],
        },
        isLoading: false,
      });
    } catch (error: unknown) {
      let errorMessage = "Failed to fetch tweets";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  getTweet: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<Tweet>(`/tweets/${slug}`);
      set({ tweet: response.data, isLoading: false });
    } catch (error: unknown) {
      let errorMessage = "Tweet not found";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      set({
        error: errorMessage,
        isLoading: false,
      });
    }
  },

  createTweet: async (formData, config) => {
    set({ isCreating: true, error: null });
    try {
      const response = await api.post<Tweet>("/tweets", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: config?.onUploadProgress,
      });

      set((state) => ({
        tweetsData: {
          ...state.tweetsData,
          data: [response.data, ...state.tweetsData.data],
        },
        isCreating: false,
      }));
    } catch (error: unknown) {
      let errorMessage = "Failed to create tweet";
      if (
        error &&
        typeof error === "object" &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "data" in error.response &&
        error.response.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
      ) {
        errorMessage =
          (error.response as { data: { message?: string } }).data.message ||
          errorMessage;
      } else if (error && typeof error === "object" && "message" in error) {
        errorMessage = (error as { message?: string }).message || errorMessage;
      }
      set({ error: errorMessage, isCreating: false });
      throw error;
    }
  },

  resetError: () => set({ error: null }),
}));
