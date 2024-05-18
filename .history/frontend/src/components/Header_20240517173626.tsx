export const Header = () => {
  return (
    <div className="px-4 w-full  flex bg-black h-screen justify-between items-center">
      <div className="">
        <h1>
          <E-commerc></E-commerc>
        </h1>
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
