import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Repeat2, Share, Verified } from "lucide-react";

const PostCard = ({ tweet }: { tweet: Tweet }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex space-x-3">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {tweet.user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Tweet Content */}
        <div className="flex-1 min-w-0">
          {/* User Info */}
          <div className="flex items-center space-x-1 flex-wrap">
            <h3 className="font-bold text-gray-900 dark:text-white hover:underline">
              {tweet.user.name}
            </h3>
            <Link
              to={`/@${tweet.user.username}`}
              className="text-gray-500 dark:text-gray-400 hover:underline text-sm"
            >
              @{tweet.user.username}
            </Link>
            {tweet.user.email_verified_at && (
              <Verified className="h-4 w-4 text-blue-500" />
            )}
            <span className="text-gray-500 dark:text-gray-400">·</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {formatDistanceToNow(new Date(tweet.created_at))} ago
            </span>
            {tweet.status === "draft" && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Draft
              </span>
            )}
          </div>

          {/* Tweet Body */}
          <Link to={`/tweets/${tweet.slug}`} className="block mt-1 space-y-2">
            {tweet.title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tweet.title}
              </h3>
            )}
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {tweet.content}
            </p>

            {/* Tweet Image */}
            {tweet.image && (
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img
                  src={tweet.image}
                  alt="Tweet content"
                  className="w-full h-auto max-h-96 object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </Link>

          {/* Tweet Actions */}
          <div className="mt-3 flex justify-between max-w-md">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
              <MessageCircle className="h-5 w-5" />
              <span>{0}</span> {/* tweet.comments_count */}
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-green-500 dark:hover:text-green-400">
              <Repeat2 className="h-5 w-5" />
              <span>{0}</span> {/* tweet.retweets_count */}
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 dark:hover:text-red-400">
              <Heart className="h-5 w-5" />
              <span>{0}</span>
              {/* tweet.likes_count || tweet.likes?.length ||  */}
            </button>
            <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400">
              <Share className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
