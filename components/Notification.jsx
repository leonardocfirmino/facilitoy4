import { Popover, Transition } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useState } from "react";
import Moment from "react-moment";
import Link from "next/link";
import axios from "axios";
import "moment/locale/pt-br";
export default function Notification({ total, pedidos, user }) {
  const [referenceElement, setReferenceElement] = useState();
  const [popperElement, setPopperElement] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });
  const changeNotify = async (id, state) => {
    await axios.post(
      process.env.NEXT_PUBLIC_PREFIX +
        process.env.NEXT_PUBLIC_SITE_URL +
        "/api/userQuery",

      {
        query: `mutation {
            update_user_carrinho_by_pk(pk_columns: {id: ${id}}, _set: {is_notify: ${state}}) {
              id
            }
      }`,
      },

      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
  };
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={setReferenceElement}
            className=" p-2 outline-0 relative text-gray-400 hover:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
              />
            </svg>

            {total > 0 && (
              <span className="bg-indigo-500 text-xs flex items-center justify-center font-bold text-white w-5 h-5  rounded-full absolute top-1 right-1">
                {total}
              </span>
            )}
          </Popover.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div className="flex w-[23rem]  flex-col text-gray-700 ring-black/5 ring-2 shadow-lg rounded-md bg-[#fdfdfd] py-4">
                <h1 className="px-5 text-xl font-bold mb-6">Notificações</h1>
                <div className="grid font-semibold text-md grid-cols-6 border-b border-gray-800 pb-1 w-full">
                  <span className="col-span-4 flex justify-start px-6">
                    Detalhes
                  </span>
                  <span className="col-span-2 flex justify-center">Visto</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {pedidos.map((value, index) => (
                    <div
                      key={index}
                      className="border-b z-20 hover:bg-gray-100 border-gray-400/50 py-2 w-full grid grid-cols-6"
                    >
                      <div className="col-span-4 py-1 gap-4 flex justify-center">
                        <Link
                          className="z-20"
                          href={"/adm/pedidos/" + value.id}
                        >
                          <a>
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
                                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                              />
                            </svg>
                          </a>
                        </Link>
                        <div className="text-md ">
                          <h1>Novo pedido recebido!</h1>
                          <div className="flex mt-1 text-[0.6rem] gap-4">
                            <Moment format="DD/MM/YY">
                              {value.created_at}
                            </Moment>
                            <span>{value.user.email}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 items-center h-full py-2 flex justify-center">
                        <input
                          type="checkbox"
                          onChange={(e) =>
                            changeNotify(value.id, !e.target.checked)
                          }
                          defaultValue={!value.is_notify}
                          className="h-5 w-5 cursor-pointer z-30 rounded form-checkbox border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
