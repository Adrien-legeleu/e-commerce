import { Sparkles, ArrowUpWideNarrow, ArrowDownWideNarrow } from "lucide-react";
interface ITriProps {
  isOpenTriComponent: boolean;
}

export const TriComponent: React.FC<ITriProps> = ({ isOpenTriComponent }) => {
  return (
    <div
      className={`px-8 w-1/4 items-center justify-center  fixed top-1/2 z-50 right-12 flex  -translate-y-1/2 bg-white py-12 rounded-3xl shadow-2xl ${
        isOpenTriComponent
          ? " visible translate-x-0 opacity-100"
          : "invisible opacity-0 translate-x-full"
      } duration-200 `}
    >
      <div className="flex flex-col gap-8">
        <div className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8">
          <Sparkles />
          <span>Nouveau</span>
        </div>
        <div className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8">
          <ArrowUpWideNarrow />
          <span>prix croissant</span>
        </div>
        <div className="py-5 px-5 shadow-xl rounded-3xl flex items-center justify-center  gap-8">
          <ArrowDownWideNarrow />
          <span>prix décroissant</span>
        </div>
      </div>
    </div>
  );
};
