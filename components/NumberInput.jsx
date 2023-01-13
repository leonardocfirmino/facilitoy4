import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
export default function NumberInput({ input, item }) {
  const dispatch = useDispatch();
  const [number, setNumber] = useState(input.current);
  const verifyNumber = (event) => {
    const inputValue = event.target.value;
    if (inputValue < 0) return setNumber(0);
    if (inputValue > 200) return setNumber(200);
    return setNumber(inputValue);
  };
  const minus = () => {
    const value = number - 1;
    if (value < 0) return setNumber(0);
    if (value > 200) return setNumber(200);
    dispatch(decrementQuantity(item.id));
    return setNumber(value);
  };
  const plus = () => {
    const value = number + 1;
    if (value < 0) return setNumber(0);
    if (value > 200) return setNumber(200);
    dispatch(incrementQuantity(item.id));
    return setNumber(value);
  };
  return (
    <div className="flex w-full justify-center gap-2">
      <button onClick={minus} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <input
        type="number"
        value={number}
        min={1}
        ref={input}
        max={200}
        onChange={verifyNumber}
        name="quantidade"
        className="noArrow outline-none p-2 bg-gray-100 rounded-md text-center appearance-none"
        id=""
      />

      <button onClick={plus} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </div>
  );
}
