// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {

//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {

//     logout();

//     navigate("/login");
//   };

//   return (
//     <nav className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white">

//       <Link
//         to="/dashboard"
//         className="text-2xl font-bold"
//       >
//         ExpenseTracker
//       </Link>

//       <div className="flex items-center gap-6">

//         <Link to="/dashboard">
//           Dashboard
//         </Link>

//         <Link to="/tasks">
//           Tasks
//         </Link>

//         <Link to="/profile">
//           Profile
//         </Link>

//         <span>
//           {user?.name}
//         </span>

//         <button
//           onClick={handleLogout}
//           className="rounded bg-red-500 px-4 py-2 hover:bg-red-600"
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-sm">
            ₹
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              ExpenseTracker
            </h1>

            <p className="hidden text-[10px] font-medium uppercase tracking-widest text-slate-400 sm:block">
              Expense Management
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Notification */}
          <button
            className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:flex"
            title="Notifications"
          >
            🔔
          </button>

          {/* User */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || ""}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <button
              onClick={handleLogout}
              className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600 md:block"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

