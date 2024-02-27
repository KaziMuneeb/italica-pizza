import { useSelector } from "react-redux";

function Username() {
  const username = useSelector((state) => state.user.userName);
  if (!username) return null;
  return (
    <div className=" text-m hidden font-semibold text-stone-900 md:block">
      {username}
    </div>
  );
}

export default Username;
