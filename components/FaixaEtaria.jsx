export default function FaixaEtaria({ faixas, faixasChecked }) {
  return (
    <fieldset className="grid grid-cols-2 gap-4 border-2 border-gray-500/30 p-3 rounded-md w-fit">
      {faixas.map((value, index) => {
        return (
          <div key={index} className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                name="faixas"
                type="checkbox"
                value={value.id}
                defaultChecked={faixasChecked.some(
                  (arr) => arr.faixa_etaria_id == value.id
                )}
                className="h-6 w-6 rounded form-checkbox border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="comments"
                className="font-semibold uppercase text-gray-700"
              >
                {value.name}
              </label>
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
