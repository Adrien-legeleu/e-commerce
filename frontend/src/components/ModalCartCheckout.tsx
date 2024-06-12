import { IProductCart } from "../types/productCart";

interface IModalprops {
  productsCart: IProductCart[];
  handleModal: () => void;
  isModalOpen: boolean;
}

export const ModalCartCheckout: React.FC<IModalprops> = ({
  handleModal,
  productsCart,
  isModalOpen,
}) => {
  return (
    <div
      className={`z-40 ${isModalOpen ? "visible" : "invisible"} duration-500`}
    >
      <div
        className="w-screen h-screen  z-0 fixed top-0 left-0 "
        onClick={handleModal}
      ></div>
      <div
        className={`fixed right-5 bottom-5 h-2/3 w-1/4 bg-white z-10 shadow-2xl overflow-y-scroll px-5 py-3 rounded-3xl ${
          isModalOpen
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-x-full  translate-y-full opacity-20"
        } ease-in-out duration-500`}
      >
        {productsCart.map((product: any, index) => (
          <div
            key={`product-to-cart-number-${index}`}
            className="flex border-b-[2px] py-2 border-[#6b728011] h-32 relative"
          >
            <div className="h-full">
              <img
                src={product.imgUrl}
                className="rounded-md shadow-xl h-full aspect-[4/5] object-cover"
                alt={`img de ${product.title}`}
              />
            </div>
            <div className="relative left-5 flex flex-col justify-between">
              <div className="space-y-1">
                <h1 className="text-sm">{product.title}</h1>
                <div className="flex gap-5 text-[#6B7280] text-[0.7rem]">
                  <p>{product.color}</p>
                  <p>{product.size}</p>
                </div>
              </div>
              <p className="font-semibold">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
