import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Import the auth context

const Navbar = () => {
  const { user, login, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 w-full border-b backdrop-blur-lg bg-background/70">
      <div className="flex px-6 h-16 max-w-full items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex flex-row gap-2 items-center">
            <img src="/logo.png" alt="StoryYetu Logo" className="h-40" />
          </Link>
        </div>

        <ul className="hidden md:flex gap-4 justify-center">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/create-story" className="nav-link">Create Story</Link></li>
          <li><Link to="/explore" className="nav-link">Explore Story</Link></li>
          <li><Link to="/contact-us" className="nav-link">Contact</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm font-medium">{user.name}</span>
              <button className="btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => login({ name: "John Doe" })}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
