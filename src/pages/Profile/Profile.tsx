import { useAuthStore } from "@/stores";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AuthLayout } from "@/components";

const ProfilePage = () => {
  const { user, logout } = useAuthStore();

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AuthLayout>
      {user && (
        <>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24 bg-gray-200 text-3xl font-medium">
              <AvatarFallback className="bg-gray-200 text-gray-700">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Account Details</h2>
              <div className="space-y-2 text-sm">
                <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                <p>
                  Email Status:{" "}
                  <span
                    className={
                      user.email_verified_at
                        ? "text-green-600"
                        : "text-yellow-600"
                    }
                  >
                    {user.email_verified_at ? "Verified" : "Not Verified"}
                  </span>
                </p>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
            >
              Sign Out
            </Button>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default ProfilePage;
