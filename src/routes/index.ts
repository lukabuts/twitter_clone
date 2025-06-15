export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  profile: "/profile",
  tweet: (slug: string) => `tweets/${slug}`,
};
