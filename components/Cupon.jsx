export default function Cupon() {
  return (
    <div className="flex gap-2 w-full">
      <input type="text" placeholder="Código do cupon" />
      <button onClick={() => checkCupon()}>Aplicar</button>
    </div>
  );
}
