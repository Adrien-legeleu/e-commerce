export const Header = () => {
  return (
    <div className="px-12 py-4 w-full  flex  justify-between items-center">
      <div className="">
        <h1 className="text-5xl">E-commerce</h1>
      </div>
      <ul className="flex items-center  gap-16">
        <li>Homme</li>
        <li>Femme</li>
        <li>Enfant</li>
      </ul>
      <div>
        <button>Panier</button>
      </div>
    </div>
  );
};
