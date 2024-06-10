import React, { useState } from "react";
interface IPropsSlider {
  images: any;
}

export const Slider: React.FC<IPropsSlider> = ({ images }) => {
  const [imageActive, setImageActive] = useState(images[0]);

  const handleImage = (e: any) => {
    const imageUrl = e.target.src;
    setImageActive(imageUrl);
  };

  return (
    <div className="flex h-110 flex-row-reverse gap-5">
      <div className="w-full h-full">
        <img
          className="rounded-2xl h-110 aspect-[4/5] object-cover"
          src={imageActive}
          alt="image principal du produit"
        />
      </div>
      <div className="carousel flex gap-5 flex-col w-[110px] h-110 ">
        {images.map((img: any, index: number) => (
          <div
            className="carousel-item rounded-box max-h-1/4 w-full object-cover"
            key={index}
            onClick={(e) => handleImage(e)}
          >
            <img className="rounded-xl" src={img} alt={`thumb ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
