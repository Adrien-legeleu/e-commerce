export const Header = () => {
  return (
    <div className="px-12 w-full  flex  justify-between items-center">
      <div className="">
        <h1>E-commerce</h1>
      </div>
      <ul className="flex items-center justify-between">
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
