import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { Link } from "react-router-dom";
import AnimatedShinyText from "./design/ShinyText";
import { Badge } from "antd";
import { useHeaderContext } from "../contexts/HeaderContext";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export const Header = () => {
  const { favorisNbr, productsToCart } = useHeaderContext();

  return (
    <div className="w-full flex 3 items-center justify-between px-12  py-6 font-montserrat">
      <AnimatedShinyText className="flex-1 text-3xl text-start tracking-wider">
        ChicEth
      </AnimatedShinyText>
      <ul className="flex items-center justify-center gap-16 flex-1">
        <Link to="/men">Homme</Link>
        <Link to="/Women">Femme</Link>
        <Link to="/Child">Enfant</Link>
      </ul>
      <div className="flex-1 flex gap-10 items-center justify-end">
        <Link to="/favorites">
          <Badge count={favorisNbr} overflowCount={99}>
            <lord-icon
              src="https://cdn.lordicon.com/ohfmmfhn.json"
              trigger="loop"
              delay="5000"
              state="hover-heartbeat-alt"
              colors="primary:#c71f16,secondary:#c71f16,quaternary:#c71f16"
              style={{ width: "50px", height: "40px" }}
            ></lord-icon>
          </Badge>
        </Link>
        <Link to="/cart">
          <Badge count={productsToCart.length} overflowCount={99}>
            <lord-icon
              src="https://cdn.lordicon.com/cosvjkbu.json"
              trigger="hover"
              style={{ width: "50px", height: "40px" }}
            ></lord-icon>
          </Badge>
        </Link>
      </div>
    </div>
  );
};
