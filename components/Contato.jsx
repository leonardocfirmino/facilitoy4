import useSWR from "swr";
import axios from "axios";
import formatPhoneNumber from "../helpers/formatPhoneNumber";
export default function Contato({ user }) {
  const fetcher = async (query) => axios.post("/api/get-phone-number", query);

  const { data, mutate } = useSWR({ email: user.email }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return (
    <div className="rounded-lg mb-6 bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
      <div className="flow-root">
        <dl className="-my-4 divide-y divide-gray-200 text-sm">
          <div className="flex items-center justify-start py-4">
            <dt className="text-md flex items-center gap-1 font-medium text-faciBlue">
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
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                />
              </svg>

              <span>Contato</span>
            </dt>
          </div>
        </dl>
        <dl className="-my-4 divide-y divide-gray-200 text-sm">
          <div className="flex items-center justify-between py-4">
            <dt className="text-base font-medium text-gray-900">{user.name}</dt>
            {data && (
              <dd className="text-base flex gap-2 items-center font-medium text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>

                <span>{formatPhoneNumber(data.data)}</span>
              </dd>
            )}
          </div>
        </dl>
      </div>
    </div>
  );
}
