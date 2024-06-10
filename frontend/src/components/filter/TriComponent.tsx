import {
  Sparkles,
  ArrowUpWideNarrow,
  ArrowDownWideNarrow,
  Flame,
} from "lucide-react";
import { IProduct } from "../../types/product";
import {
  filterDecreasing,
  filterIncreasing,
  filterNew,
  filterPopularity,
} from "./FunctionTri";
interface ITriProps {
  isOpenTriComponent: boolean;
  productsFiltered: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const TriComponent: React.FC<ITriProps> = ({
  isOpenTriComponent,
  productsFiltered,
  setProducts,
}) => {
  return (
    <div
      className={`px-8 w-1/4 items-center justify-center  fixed top-1/2 z-50 right-12 flex  -translate-y-1/2 bg-white py-12 rounded-3xl shadow-2xl ${
        isOpenTriComponent
          ? " visible translate-x-0 opacity-100"
          : "invisible opacity-0 translate-x-full"
      } duration-200 `}
    >
      <div className="flex flex-col gap-8">
        <div
          className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8 cursor-pointer"
          onClick={() => filterPopularity(productsFiltered, setProducts)}
        >
          <Flame />
          <span>Popularité</span>
        </div>
        <div
          className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8 cursor-pointer"
          onClick={() => filterNew(productsFiltered, setProducts)}
        >
          <Sparkles />
          <span>Nouveau</span>
        </div>
        <div
          className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8 cursor-pointer"
          onClick={() => filterIncreasing(productsFiltered, setProducts)}
        >
          <ArrowUpWideNarrow />
          <span>prix croissant</span>
        </div>
        <div
          className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8 cursor-pointer"
          onClick={() => filterDecreasing(productsFiltered, setProducts)}
        >
          <ArrowDownWideNarrow />
          <span>prix décroissant</span>
        </div>
      </div>
    </div>
  );
};
