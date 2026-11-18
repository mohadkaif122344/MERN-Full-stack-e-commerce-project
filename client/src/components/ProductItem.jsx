import { useContext } from "react";
import { Link } from "react-router-dom";
import { cartDataContext } from "../context/CartContext";

const ProductItem = ({ id, image, name, price }) => {

  const { currency } = useContext(cartDataContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="flex h-full flex-col text-gray-700 cursor-pointer px-2 md:mx-1 dark:text-neutral-300"
      to={`/product/${id}`}>
      <div className=" overflow-hidden border-2 rounded-lg">
        <img
          className="h-96 w-full object-cover hover:scale-105 transition ease-in-out rounded-md"
          src={image[0]}
          alt="" />
      </div>
      <p className="pt-3 pb-1 text-lg dark:text-neutral-300">{name}</p>
      <p className=" text-sm font-medium dark:text-neutral-400">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
