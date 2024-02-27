import { formatCurrency } from "../../utils/helpers";
import Button from "../../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, increaseQuatity } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleAddItem() {
    if (cart.find((item) => item.pizzaId === id)) {
      dispatch(increaseQuatity(id));
    } else {
      const newItem = {
        pizzaId: id,
        name: name,
        quantity: 1,
        unitPrice,
        totalPrice: 1 * unitPrice,
      };
      dispatch(addItem(newItem));
    }
    navigate("/cart");
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut && (
            <Button onclick={handleAddItem} type="small">
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
