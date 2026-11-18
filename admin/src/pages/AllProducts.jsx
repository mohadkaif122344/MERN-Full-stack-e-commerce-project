import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { API } = useContext(adminDataContext);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API}/api/product/list`);
      setAllProducts(Array.isArray(data) ? data : data.products);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProducts = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/api/product/remove/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      getAllProducts();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-neutral-700 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 p-4">
      <h1 className="mb-5 text-2xl font-bold">All Listed Products</h1>

      <div className="overflow-x-auto rounded-lg border bg-white table-scroll">
        <table className="w-full min-w-[650px] text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {allProducts.length ? (
              allProducts.map((item, index) => (
                <tr key={item._id} className="border-t">
                  <td className="p-3">{index+1}</td>
                  <td className="p-3">
                    <img
                      src={item.image?.[0]}
                      alt={item.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">₹{item.price}</td>
                  <td className="p-3">
                    <Link to={`/edit-product/${item._id}`}>
                      <FiEdit size={20} className="text-neutral-600" />
                    </Link>
                  </td>
                  <td className="p-3">
                    <button onClick={() => removeProducts(item._id)}>
                      <MdDelete size={22} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-5 text-center">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
