import Button from "../../UI/Button";

function EmptyCart() {
  return (
    <div className="space-y-5">
      <p>Empty cart! Add some Pizzas 🍕</p>
      <Button to="/menu" type="primary">
        Back to Menu
      </Button>
    </div>
  );
}

export default EmptyCart;
