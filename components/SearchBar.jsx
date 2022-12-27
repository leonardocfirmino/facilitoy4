export default function SearchBar() {
  return (
    <div className="flex w-full max-w-3xl">
      <input
        type="text"
        placeholder="Buscando algum brinquedo?"
        className="border-gray-200 w-full rounded-l-full text-base px-4 py-2 outline-none border-[1px]"
      />
      <button className="bg-red-600 pr-4 pl-3 py-2 text-white rounded-r-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}
