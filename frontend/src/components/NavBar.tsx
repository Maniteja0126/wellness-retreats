
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sticky top-0 w-full z-50 bg-gray-300 border border-r shadow-md">
      <nav className="h-24 flex items-center justify-between px-8">
        <div>
          <Link to='/'>
          <h1 className="font-moonDance text-3xl">Wellness Retreats</h1>
          </Link>
        </div>
        <div className=" flex items-center gap-4 mr-10">
          <ul className="flex gap-4">
            <li className="item">Home</li>
            <li className="item">About</li>
            <li className="item">Services</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
