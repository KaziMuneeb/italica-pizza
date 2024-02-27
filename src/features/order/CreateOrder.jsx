import Button from "../../UI/Button";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clearCart, getTotalPizzaPrice } from "../cart/cartSlice";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const {
    userName,
    address: userAddress,
    position,
    error: geolocationError,
    status: geolocationStatus,
  } = useSelector((state) => state.user);
  console.log(geolocationStatus);
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalPizzaPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={userName}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            <p className="ml-2 font-semibold	 text-red-500">
              {formError?.message && formError.message}
            </p>
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>

          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={userAddress}
            />
            {!(position.latitude && position.longitude) && (
              <span className="absolute right-1 top-[2.2rem] md:top-1">
                <Button
                  type="small"
                  onclick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  disabled={geolocationStatus === "loading"}
                >
                  Get Position
                </Button>
              </span>
            )}
            <p className="font-semibold text-red-500">
              {geolocationError && geolocationError}
            </p>
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
        <input
          type="hidden"
          name="position"
          value={
            position.latitude &&
            position.longitude &&
            `${position.latitude},${position.longitude}`
          }
        />
        <div>
          <Button type="primary" disabled={geolocationStatus === "loading"}>
            {isSubmitting ? "Placing order.." : "Order now"} : for{" "}
            {formatCurrency(totalPrice)}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    priority: data.priority === "true",
    cart: JSON.parse(data.cart),
  };
  const errors = { message: "Give a valid mobile number bro !!" };
  if (!isValidPhone(order.phone)) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
