export const Header = () => {
  return (
    <div className="px-12 py-4 w-full bg-blue-200  flex  justify-between items-center">
      <ul className="flex items-center  gap-16 flex-1">
        <li>Homme</li>
        <li>Femme</li>
        <li>Enfant</li>
      </ul>
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl">E-commerce</h1>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <button>Logout</button>
        <button>Panier</button>
      </div>
    </div>
  );
};
