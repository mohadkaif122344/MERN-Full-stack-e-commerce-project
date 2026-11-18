import { useContext, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { cartDataContext } from "../context/CartContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  const { products, search, showSearch } = useContext(cartDataContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
     setCategory((prev) => prev.filter((item) => item !== e.target.value));
   } else {
     setCategory((prev) => [...prev, e.target.value]);
   }
   };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
    setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
    setSubCategory((prev) => [...prev, e.target.value]);
    }
   };

  const applyFilter = () => {
   let productsCopy = products.slice();

   if(showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
      );
   }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
      subCategory.includes(item.subCategory),
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 pt-10 border-t mb-6 dark:bg-neutral-950 dark:text-white">
      <div className="order-1 sm:col-start-2 sm:col-span-3 min-w-0">
        <div className="mx-2 flex justify-between items-center mb-8 sm:mb-12 text-2xl md:text-3xl">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className=" border border-gray-300 text-sm sm:text-base px-2 sm:px-4 py-2 rounded-md dark:bg-gray-950 dark:text-white max-w-[190px]">
            <option value="relavent">Sort: Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="order-2 px-3 sm:px-0 sm:col-start-1 sm:row-start-1 sm:row-span-2">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="px-4 my-4 sm:my-10 text-2xl flex items-center cursor-pointer gap-2 bg-white text-black dark:bg-gray-950 dark:text-white">
          FILTERS
          <IoIosArrowDown
            className={`sm:hidden transition-transform border-2 w-5 h-5 rounded-full ${
              showFilter ? "rotate-90" : ""
            }`}/>
        </p>
        <div
          className={`ml-4 w-[80%] sm:w-full border border-gray-300 pl-5 py-3 mt-4 sm:mt-6 rounded-md ${ showFilter ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-neutral-300">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}/>
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}/>
              Women
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}/>
              Kids
            </p>
          </div>
        </div>
        <div
          className={`ml-4 w-[80%] sm:w-full border border-gray-300 pl-5 py-3 my-5 rounded-md ${
            showFilter ? "" : "hidden"
          } sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-neutral-300">

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}/>
              Topwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCategory}/>
              Bottomwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}/>
              Winterwear
            </p>

          </div>
        </div>
      </div>

      <div className="order-3 min-w-0 sm:col-start-2 sm:col-span-3 -mt-4">
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
  {filterProducts.map((item, index) => (
    <ProductItem
      key={item._id || index}
      name={item.name}
      id={item._id}
      price={item.price}
      image={item.image}/>
  ))}
</div>

      </div>

    </div>
  );
};

export default Collections;
