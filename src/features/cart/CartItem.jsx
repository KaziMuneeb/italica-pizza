import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import UpdateItemQuantity from "./updateItemQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <Button onclick={() => dispatch(deleteItem(pizzaId))} type="small">
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
