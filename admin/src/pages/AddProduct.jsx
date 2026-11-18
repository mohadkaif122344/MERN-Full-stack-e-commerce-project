import { useContext, useState } from "react";
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

function AddProduct() {
  const { API } = useContext(adminDataContext);

  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("TopWear");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleAddProduct = async (e) => {
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
        if (image) formData.append(`image${index + 1}`, image);
      });

      const { data } = await axios.post(`${API}/api/product/add`,
        formData, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("TopWear");
        setBestSeller(false);
        setSizes([]);
        setImages([false, false, false, false]);
        e.target.reset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 p-4 text-gray-800">
      <form onSubmit={handleAddProduct} className="flex max-w-4xl flex-col gap-4">
        <h1 className="text-2xl font-bold">Add Product</h1>

        <div>
          <p className="mb-2 font-medium">Upload Images</p>
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded border bg-white"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Product"
                    className="h-full w-full object-cover"
                  />
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
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Product Description</label>
          <textarea
            className="w-full rounded border p-3"
            rows={4}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label>Category</label>
            <select
              className="w-full rounded border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
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
              onChange={(e) => setSubCategory(e.target.value)}
            >
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
            placeholder="₹ 2000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
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
                    ? "border-neutral-700 bg-neutral-600 text-white"
                    : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
          />
          Add to Bestseller
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-neutral-600 hover:bg-neutral-800 p-3 text-white disabled:opacity-60 sm:w-fit"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
