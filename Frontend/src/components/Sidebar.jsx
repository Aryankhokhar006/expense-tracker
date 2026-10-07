// import { Link } from "react-router-dom";

// const Sidebar = () => {

//   return (
//     <aside className="min-h-screen w-64 bg-slate-800 p-5 text-white">

//       <h2 className="mb-8 text-xl font-bold">
//         Expense Tracker
//       </h2>

//       <nav className="space-y-3">

//         <Link
//           to="/dashboard"
//           className="block rounded px-4 py-3 hover:bg-slate-700"
//         >
//           Dashboard
//         </Link>

//         <Link
//           to="/expenses"
//           className="block rounded px-4 py-3 hover:bg-slate-700"
//         >
//           My Expenses
//         </Link>

//         <Link
//           to="/expenses/create"
//           className="block rounded px-4 py-3 hover:bg-slate-700"
//         >
//           Add Expense
//         </Link>

//         <Link
//           to="/profile"
//           className="block rounded px-4 py-3 hover:bg-slate-700"
//         >
//           Profile
//         </Link>

//       </nav>

//     </aside>
//   );
// };

// export default Sidebar;

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-200 bg-white p-4 md:block">

      {/* Navigation */}
      <div className="space-y-2">

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          <span className="text-lg">▦</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/expenses"
          className={linkClass}
        >
          <span className="text-lg">✓</span>
          My Expenses
        </NavLink>

        <NavLink
          to="/expenses/create"
          className={linkClass}
        >
          <span className="text-lg">＋</span>
          Add Expense
        </NavLink>

        <NavLink
          to="/profile"
          className={linkClass}
        >
          <span className="text-lg">◯</span>
          Profile
        </NavLink>

      </div>

      {/* Bottom Information */}
      <div className="mt-10 rounded-2xl bg-slate-50 p-4">

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Expense Tracker
        </p>

        <p className="mt-2 text-sm leading-5 text-slate-600">
          Track every rupee, see where it goes and spend smarter.
        </p>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-3/4 rounded-full bg-blue-600" />
        </div>

        <p className="mt-2 text-xs text-slate-400">
          Save more 💰
        </p>

      </div>
    </aside>
  );
};

export default Sidebar;

