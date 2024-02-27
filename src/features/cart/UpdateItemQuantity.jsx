import { useDispatch } from "react-redux";
import Button from "../../UI/Button";
import { decreaseQuantity, increaseQuatity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button type="round" onclick={() => dispatch(decreaseQuantity(pizzaId))}>
        -
      </Button>
      <Button type="round" onclick={() => dispatch(increaseQuatity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
