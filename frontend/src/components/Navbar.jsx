import { Link } from "react-router-dom";
import {LogOut} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const { authUser, fetchAuthUser, logOut } = useAuthStore();

  const handleLogout = async() => {
    await logOut();
    await fetchAuthUser();
  }
  return (
    <div className="navbar bg-base-300 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
          MergApp
        </Link>
      </div>
      <div className="hidden md:flex gap-2">
        <Link to="/about" className="btn btn-ghost">About</Link>
        {authUser ? <button onClick={handleLogout} className="btn btn-ghost"><LogOut /></button> : <Link to="/login" className="btn btn-ghost">Log In</Link>}
      </div>
      {/* Mobile menu */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/about">About</Link></li>
          <li>{authUser ? <button onClick={handleLogout} className="btn btn-ghost"><LogOut /></button> : <Link to="/login">Log In</Link>}</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar