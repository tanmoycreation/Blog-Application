import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { useState, useContext } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/Themcontex";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const { user } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // Use ThemeContext

  const showMenu = () => {
    setMenu(!menu);
  };

  return (
    <nav className={`sticky top-0 ${theme === "light" ? "bg-blue-600" : "bg-gray-800"} text-white shadow z-50`}>
      <div className="flex items-center justify-between px-6 py-4 md:px-[200px]">
        <h1 className="text-lg md:text-xl font-extrabold">
          <Link to="/">Blog Application</Link>
        </h1>

        {path === "/" && (
          <div className="relative w-1/3">
            <p
              onClick={() => navigate(prompt ? "?search=" + prompt : navigate("/"))}
              className="cursor-pointer absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaSearch />
            </p>
            <input
              onChange={(e) => setPrompt(e.target.value)}
              className="pl-10 pr-3 py-2 outline-none border border-gray-300 rounded w-full text-black"
              placeholder="Search a post"
              type="text"
            />
          </div>
        )}

        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="hover:text-gray-300">
            {theme === "light" ? "🌙" : "☀️"} {/* Toggle icon */}
          </button>
          {user ? (
            <>
              <Link to="/write" className="hover:text-gray-300">Write</Link>
              <div onClick={showMenu}>
                <p className="cursor-pointer relative"><FaBars /></p>
                {menu && <Menu />}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>

        <div onClick={showMenu} className="md:hidden text-lg">
          {menu && <Menu />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
