import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalPizzaQuntity, getTotalPizzaPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
function CartOverview() {
  const pizzaQuntity = useSelector(getTotalPizzaQuntity);
  const pizzaPrice = useSelector(getTotalPizzaPrice);

  return (
    <div className=" flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{pizzaQuntity} pizzas</span>
        <span>{formatCurrency(pizzaPrice)}</span>
      </p>
      <Link to="/cart" className="text-stone-400">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
