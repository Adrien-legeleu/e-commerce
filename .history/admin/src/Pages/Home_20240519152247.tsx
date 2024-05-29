import { Header } from "../components/header";

export const Home = () => {
  return (
    <div>
      <Header />
      <div className="py-10 flex items-center justify-center">
        <button>Create products</button>
      </div>
    </div>
  );
};
