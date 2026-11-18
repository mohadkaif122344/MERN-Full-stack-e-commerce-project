import { useNavigate, useParams } from "react-router-dom";
import { cartDataContext } from "../context/CartContext";
import { useContext, useEffect, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetailsPage = () => {
  const navigate = useNavigate()
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(cartDataContext);

  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = () => {
    const item = products.find((product) => product._id === productId);

    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    } else {
      setProductData(false);
      setImage("");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return null;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-16">
      <button
      onClick={() => navigate("/collection")}
      className="hover:text-blue-700  cursor-pointer duration-300 hover:scale-95 px-5 pb-5 rounded-md">
      ← Back to Collections
    </button>
      <div className="flex flex-col sm:flex-row ">
        <div className="w-full h-[380px] sm:w-[48%] sm:h-[480px] sm:flex-none min-w-0 flex flex-row gap-3">
  <div className="grid grid-rows-4 gap-2 w-[17.4%] sm:w-[13.3%] flex-shrink-0 h-full">
    {productData.image.map((item, index) => (
      <img
        onClick={() => setImage(item)}
        src={item}
        key={index}
        className="w-full h-full min-h-0 object-cover cursor-pointer rounded-lg border"
        alt=""/>
    ))}
  </div>
  <div className="flex-1 min-w-0 h-full">
    <img
      className="w-96 h-full object-cover rounded-xl border-2"
      src={image}
      alt="" />
  </div>
</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 mt-2 text-yellow-500">
            <FaStar size={14} />
            <FaStar size={14} />
            <FaStar size={14} />
            <FaStar size={14} />
            <FaRegStar size={14} />
            <p className="pl-2 text-gray-600 dark:text-neutral-400">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-gray-600 dark:text-neutral-400">
            {productData.name.toUpperCase()}
          </p>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 md:w-4/5 dark:text-neutral-400">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2 ">
              {productData.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 rounded-md ${
                    size === item ? "border-orange-600 bg-neutral-200 dark:bg-neutral-600" : ""
                  }`}>
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-neutral-600 text-white px-8 py-3 text-sm hover:bg-neutral-800 rounded-md duration-300">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 dark:text-neutral-400">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm rounded-md">Description</b>
          <p className="border px-5 py-3 text-sm rounded-md">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 rounded-md dark:text-neutral-400">
          <p>
            Our e-commerce website makes online shopping simple and convenient.
            Customers can explore a wide range of products, compare prices, and
            shop from the comfort of their homes.
          </p>
          <p>
            Each product page includes useful details such as product
            descriptions, images, prices, available sizes, and colors, helping
            customers choose the right product according to their needs.
          </p>
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default ProductDetailsPage;
