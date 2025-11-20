import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { orgModules } = useAuth();

  return (
    <aside className="w-30 bg-gray-100 border-r p-4 h-screen ">
      <h2 className="font-bold mb-4 text-lg">Modules bhai</h2>
      <ul className="space-y-2">
        {orgModules.map((m) => (
          <li key={m}>
            <Link
              to={`/${m.toLowerCase()}`}
              className="block p-2 rounded hover:bg-amber-500 hover:text-white text-amber-800"
            >
              {m}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
