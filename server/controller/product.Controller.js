import cloudinary from "../config/cloudinary.js";
import ProductModel from "../model/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const {name,description,price,category,subCategory,sizes,bestSeller} = req.body;

    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
          folder: "ecommerce product",
        });
        return result.secure_url;
      }),
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };
    const product = await ProductModel.create(productData);
    return res.status(201).json({success: true,message: "Product added successfully",product});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};


export const getProduct = async (req, res) => {
  try {
       const products = await ProductModel.find({}).sort({ createdAt: -1 });;
       if (!products) {
      return res.status(404).json({success: false, message: "Product not found"});
    }
       return res.status(200).json({success:true, message:"product found successfully",products})
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const removeProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const product = await ProductModel.findByIdAndDelete(id)
    if (!product) {
      return res.status(404).json({success: false,message: "Product not found",
      });
    }
    return res.status(200).json({success:true, message:"Product remove successfully",product})
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({success: false,message: "Product not found",
      });
    }
    return res.status(200).json({success: true,message: "Product found successfully",product});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {name,description,price,category,subCategory,sizes,bestSeller} = req.body;

    const image1 = req.files?.image1 && req.files.image1[0];
    const image2 = req.files?.image2 && req.files.image2[0];
    const image3 = req.files?.image3 && req.files.image3[0];
    const image4 = req.files?.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = [];

    if (images.length > 0) {
      imageUrl = await Promise.all(
        images.map(async (item) => {
          const result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
            folder: "ecommerce procuct",
          });
          return result.secure_url;
        })
      );
    }
    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true",
      sizes: JSON.parse(sizes),
    };
    if (images.length > 0) {
      productData.image = imageUrl;
    }
    const product = await ProductModel.findByIdAndUpdate(id,productData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({success: false,message: "Product not found"});
    }
    return res.status(200).json({success: true,message: "Product updated successfully",product});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};
