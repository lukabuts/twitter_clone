import { api } from "@/lib";
import { create } from "zustand";

interface TweetStore {
  tweetsData: TweetData;
  tweet: Tweet | null;
  isLoading: boolean;
  error: string | null;
  fetchTweets: (page: number) => Promise<void>;
  getTweet: (slug: string) => Promise<void>;
  // addTweet: (tweet) => Promise<any>;
}

export const useTweetStore = create<TweetStore>((set) => ({
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
  isLoading: true,
  error: null,

  fetchTweets: async (page) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/tweets?page=${page}`);
      set((state) => ({
        tweetsData: {
          ...response.data,
          data:
            page === 1
              ? response.data.data
              : [...state.tweetsData.data, ...response.data.data],
        },
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch tweets:", error);
      set({ error: "Failed to fetch tweets", isLoading: false });
    }
  },

  getTweet: async (slug) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get(`/tweets/${slug}`);
      set({ isLoading: false });
      if (response.data) {
        set({ tweet: response.data });
      }
    } catch (error) {
      console.error("Failed to fetch tweet:", error);
      set({ error: "Failed to fetch tweet", isLoading: false });
    }
  },

  // addTweet: async (tweet) => {
  //   try {
  //     const response = await api.post("/tweets", tweet);
  //     return response;
  //   } catch (error) {
  //     console.error("Failed to add tweet:", error);
  //     set({ error: "Failed to add tweet" });
  //   }
  // },

  // clearError: () => set({ error: null }),
}));
