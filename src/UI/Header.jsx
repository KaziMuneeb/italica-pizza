import { Link } from "react-router-dom";
import OrderQuery from "../features/order/OrderQuery";
import Username from "../features/user/Username";

function Header() {
  return (
    <nav className="flex justify-between border-b-4 border-stone-400 bg-yellow-500 p-4 pl-8 text-xl uppercase ">
      <Link to={"/"} className="tracking-widest">
        Italica Pizza
      </Link>
      <OrderQuery />
      <Username />
    </nav>
  );
}

export default Header;
