import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import CartItem from "./CartItem";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const username = useSelector((state) => state.user.userName);
  const dispatch = useDispatch();

  return (
    <div className="px-4 py-3">
      <h2 className="mt-7 text-xl font-semibold">
        {cart.length > 0 ? "Your cart," : <EmptyCart />} {username}
      </h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      {cart.length > 0 && (
        <div className="mt-6 flex space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>
          <Button to="/menu" type="primary">
            Back to Menu
          </Button>
          <Button onclick={() => dispatch(clearCart())} type="secondary">
            Clear cart
          </Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
