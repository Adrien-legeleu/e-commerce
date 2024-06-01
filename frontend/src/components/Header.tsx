import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="px-12 py-4 w-full bg-blue-200  flex  justify-between items-center">
      <ul className="flex items-center  gap-16 flex-1">
        <Link to="/men">Homme</Link>
        <Link to="/Women">Femme</Link>
        <Link to="/Child">Enfant</Link>
      </ul>
      <div className="flex-1 flex items-center justify-center">
        <Link to="/">
          <h1 className="text-2xl">E-commerce</h1>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <button>Panier</button>
      </div>
    </div>
  );
};
