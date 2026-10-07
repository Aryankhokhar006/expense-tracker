import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Profile
              </h1>

              <p className="mt-1 text-gray-600">
                View your account information
              </p>
            </div>

            {/* Profile Card */}
            <div className="rounded-xl bg-white p-8 shadow">
              {/* Avatar */}
              <div className="mb-8 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">
                  {user?.name
                    ? user.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500">
                    Full Name
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {user?.name || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-800">
                    {user?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Account Status
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    Active
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className="mt-8 border-t pt-6">
                <Link
                  to="/dashboard"
                  className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;