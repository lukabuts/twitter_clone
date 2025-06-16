import { useTweetStore } from "@/stores";
import { useCallback, useEffect, useRef } from "react";
import { TweetCard } from "./components";
import { CreateTweet } from "@/components";

const Home = () => {
  const { fetchTweets, tweetsData, isLoading } = useTweetStore();
  const observer = useRef<IntersectionObserver>(null);

  // Fetch initial tweets
  useEffect(() => {
    fetchTweets(1);
  }, [fetchTweets]);

  // Infinite scroll handler
  const lastTweetRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && tweetsData.next_page_url) {
          fetchTweets(tweetsData.current_page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, fetchTweets, tweetsData]
  );

  if (!tweetsData.data || (tweetsData.data.length === 0 && !isLoading)) {
    return (
      <div className="flex justify-center py-8 text-gray-500 dark:text-gray-400">
        No tweets available
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto border-x">
      <CreateTweet />
      {tweetsData.data.map((tweet, index) => (
        <div
          key={tweet.id}
          ref={index === tweetsData.data.length - 1 ? lastTweetRef : null}
        >
          <TweetCard tweet={tweet} />
        </div>
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!tweetsData.next_page_url && tweetsData.data.length > 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          You've reached the end of tweets
        </div>
      )}
    </div>
  );
};

export default Home;
