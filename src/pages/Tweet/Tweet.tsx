import { useTweetStore } from "@/stores";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "@/components";
import { ArrowLeft, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TweetDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getTweet, tweet } = useTweetStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useTweetStore.setState({ tweet: null });
    if (slug) {
      setIsLoading(true);
      getTweet(slug).finally(() => setIsLoading(false));
    }
  }, [getTweet, slug]);

  if (isLoading) return <Loading />;
  if (!tweet) return <div className="text-center py-8">Tweet not found</div>;

  return (
    <div className="max-w-2xl mx-auto border-x border-gray-200 dark:border-gray-800 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-6">
        <Button variant="ghost" size="icon" className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="font-bold text-xl">Tweet</h1>
      </div>

      {/* Tweet Content */}
      <div className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            {/* <AvatarImage src={tweet.user.avatar} /> */}
            <AvatarFallback>
              {tweet.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center gap-1">
              <h2 className="font-bold hover:underline">{tweet.user.name}</h2>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(tweet.created_at))} ago
              </span>
              {tweet.status === "draft" && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Draft
                </span>
              )}
            </div>

            <p className="text-gray-500 text-sm">@{tweet.user.username}</p>

            <div className="mt-3 space-y-3">
              <p className="text-lg whitespace-pre-line">{tweet.content}</p>

              {tweet.images && (
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden mt-3">
                  {
                    tweet.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Tweet image ${index + 1}`}
                        className="w-full h-auto max-h-96 object-cover"
                        loading="lazy"
                      />
                    ))
                  }
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-4 text-gray-500 text-sm">
              {/* {tweet.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tweet.location}</span>
                </div>
              )} */}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(tweet.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-4"></div>

        {/* Stats */}
        <div className="flex gap-4 text-sm">
          <div className="flex gap-1">
            <span className="font-bold">0</span>
            <span className="text-gray-500">Likes</span>
          </div>
          <div className="flex gap-1">
            <span className="font-bold">0</span>
            <span className="text-gray-500">Comments</span>
          </div>
        </div>
      </div>

      {/* Future Comments Section Placeholder */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-4 text-center text-gray-500">
        Comments will appear here
      </div>
    </div>
  );
};

export default TweetDetail;
