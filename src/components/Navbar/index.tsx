import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
const Navbar = () => {
  return (
    <header className="flex items-center justify-between p-10">
      <Link to={"/"}>Candra</Link>
      <nav></nav>
      <ModeToggle />
    </header>
  );
};

export default Navbar;
