import React from "react";

interface ModalProps {
  closeModal: () => void;
}

export const ModalProduct: React.FC<ModalProps> = ({ closeModal }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center">
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#00000060] backdrop-blur-sm "></div>
      <div className="shadow-2xl bg-slate-50 w-1/2 z-10 py-10 px-20 rounded-3xl space-y-10">
        <h1 className="text-center text-2xl">Create a new product</h1>
        <form className="space-y-8">
          <div className="grid grid-cols-2 gap-5">
            {infoInputProducts.map((info, index) => {
              return (
                <div
                  className="relative h-11 w-full min-w-[200px]"
                  key={`input number :  ${index} `}
                >
                  <input
                    placeholder={info}
                    type="email"
                    id="email"
                    name="email"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                  />
                  <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    {info}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-center">
            <button className="py-3 px-5 rounded-full shadow-2xl bg-[#00000009] hover:scale-105 duration-150">
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const infoInputProducts = [
  "title",
  "desc",
  "size",
  "url-image",
  "color",
  "price",
  "deliveryDate",
];
