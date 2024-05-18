export const Header = () => {
  return (
    <div className="px-4 w-full  flex bg-black h-full justify-between items-center">
      <div className="">
        <h1>E-commerce</h1>
      </div>
      <ul>
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
