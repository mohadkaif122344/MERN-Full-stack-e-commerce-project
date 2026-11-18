import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API } = useContext(adminDataContext);

  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [price, setPrice] = useState("");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data } = await axios.get(`${API}/api/product/single/${id}`);
        const product = data.product;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price ?? "");
        setSubCategory(product.subCategory);
        setBestSeller(product.bestSeller ?? false);
        setSizes(Array.isArray(product.sizes) ? product.sizes : []);
        setImages([
          product.image?.[0],
          product.image?.[1],
          product.image?.[2],
          product.image?.[3],
        ]);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setFetching(false);
      }
    };

    getProduct();
  }, [API, id]);

  const handleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestSeller", String(bestSeller));
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((image, index) => {
        if (image instanceof File) {
          formData.append(`image${index + 1}`, image);
        }
      });
      const { data } = await axios.put(`${API}/api/product/update/${id}`,
        formData, { withCredentials: true });
      toast.success(data.message);
      navigate("/products");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

 if (fetching) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-neutral-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4 text-gray-800">
      <form onSubmit={handleUpdateProduct} className="flex max-w-4xl flex-col gap-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <div>
          <p className="mb-2 font-semibold">Upload Images</p>
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded border bg-white">
                {image ? (
                  <img
                    src={
                      image instanceof File
                        ? URL.createObjectURL(image)
                        : image
                    }
                    alt="Product"
                    className="h-full w-full object-cover"/>
                ) : (
                  <MdCloudUpload size={30} className="text-neutral-600" />
                )}

                <input
                  id={`image${index + 1}`}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImages((prev) =>
                        prev.map((img, i) => (i === index ? file : img))
                      );
                    }
                  }}
                />
              </label>
            ))}
          </div>
        </div>

        <div>
          <label>Product Name</label>
          <input
            className="w-full rounded border p-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required/>
        </div>

        <div>
          <label>Product Description</label>
          <textarea
            className="w-full rounded border p-3"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required/>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label>Product Category</label>
            <select
              className="w-full rounded border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <label>Sub-Category</label>
            <select
              className="w-full rounded border p-3"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}>
              <option value="TopWear">TopWear</option>
              <option value="BottomWear">BottomWear</option>
              <option value="WinterWear">WinterWear</option>
            </select>
          </div>
        </div>

        <div>
          <label>Product Price</label>
          <input
            type="number"
            min="0"
            className="w-full rounded border p-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required/>
        </div>

        <div>
          <p className="mb-2">Product Size</p>
          <div className="flex flex-wrap gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => handleSize(size)}
                className={`rounded border px-4 py-2 ${
                  sizes.includes(size)
                    ? "border-neutral-800 bg-neutral-600 text-white"
                    : "bg-white"
                }`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}/>
          Add to Bestseller
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-neutral-600 p-3 font-semibold text-white hover:bg-neutral-800 disabled:opacity-60 sm:w-fit">
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
