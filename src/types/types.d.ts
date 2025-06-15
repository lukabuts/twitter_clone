interface Tweet {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string | null;
  slug: string;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    name: string;
    username: string;
    email_verified_at: string | null;
  };
  likes: string[];
}

interface TweetData {
  current_page: number;
  data: Tweet[];
  current_page_url: string;
  first_page_url: string;
  from: number;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}
