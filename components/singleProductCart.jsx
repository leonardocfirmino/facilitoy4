import NumberInput from "../components/NumberInput";

import { useRef, useState } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { editTime } from "../redux/features/cartSlice";
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
  return (
    <li key={product.product.id} className="flex py-6 sm:py-10">
      <div className="flex-shrink-0">
        <img
          src={product.product.images[0].src}
          className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
        />
      </div>

      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div>
          <div className="flex justify-between sm:grid sm:grid-cols-2">
            <div className="pr-6">
              <h3 className="text-sm">
                <a
                  href={product.product.slug}
                  className="font-medium text-gray-700 hover:text-gray-800"
                >
                  {product.product.name}
                </a>
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

            <p className="text-right text-sm font-medium text-gray-900">
              R$ {product.time.price * product.quantity}
            </p>
          </div>

          <div className="mt-4 flex items-center sm:absolute sm:top-0 sm:left-1/2 sm:mt-0 sm:block">
            <NumberInput item={product} input={selectQuantidade} />
          </div>
        </div>
      </div>
    </li>
  );
}
