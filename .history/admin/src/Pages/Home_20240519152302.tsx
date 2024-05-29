import { Header } from "../components/header";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="py-10 flex items-center justify-center">
        <button className="py-4 px-8 bg-slate-200 rounded-full">
          Create products
        </button>
      </div>
    </div>
  );
};
