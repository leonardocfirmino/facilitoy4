import NumberInput from "../components/NumberInput";

import { useRef, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { editTime, removeFromCart } from "../redux/features/cartSlice";
import Link from "next/link";
export default function SingleProductCart({ product }) {
  const selectQuantidade = useRef(product.quantity);
  const dispatch = useDispatch();
  const selectTime = useRef({
    label: product.time.tempo,
    value: product.time.price,
  });
  const precos = product.product.precos.map((value) => {
    return {
      value: value.price,
      label: value.tempo,
    };
  });
  console.log(product);
  return (
    <li key={product.product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={
            "https://space-facilitoy.sfo3.cdn.digitaloceanspaces.com/" +
            product.product.product_images[0].src
          }
          className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm">
                <Link href={"brinquedos/" + product.product.slug}>
                  <a className="font-medium text-gray-700 hover:text-gray-800">
                    {product.product.name}
                  </a>
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <Select
                noOptionsMessage={() => "Nada encontrado"}
                ref={selectTime}
                className="text-black w-32"
                defaultValue={selectTime.current}
                name={"time"}
                onChange={(value) =>
                  dispatch(
                    editTime({
                      time: { tempo: value.label, price: value.value },
                      id: product.id,
                    })
                  )
                }
                options={precos}
              />
            </div>
            <div className="flex flex-col items-end ">
              <p className="text-right my-4 text-sm font-medium text-gray-900">
                <span> R$ {product.time.price * product.quantity}</span>
              </p>
              <button
                onClick={() =>
                  dispatch(
                    removeFromCart({
                      id: product.id,
                    })
                  )
                }
              >
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
