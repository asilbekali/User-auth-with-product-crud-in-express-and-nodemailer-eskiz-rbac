const Product = require("../models/proModel");

const createProductImg = async (req, res, next) => {
    try {
        const { name, desc, price } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Image file is required!" });
        }

        const imageUrl = `../uploads/${file.filename}`;

        const newProduct = await Product.create({
            name: name,
            desc: desc,
            price: price,
            imageUrl: imageUrl,
        });

        res.status(201).json({
            message: "Product created successfully",
            data: newProduct,
        });
        next()
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};

const creatPro = async (req, res, next) => {
    try {
        const { name, price, desc, imgUrl } = req.body;
        
        const newPro = await Product.create({
            name: name,
            price: price,
            desc: desc,
            imgUrl: "no img",
        });
        res.status(201).send(newPro);
        next()
    } catch (error) {
        res.send("Creat product error !\n\n");
        console.log(error);
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ Maxsulotlar: products });
        next()
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message,
        });
    }
};

const getProductById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ data: product });
        next()
    } catch (error) {
        res.status(500).json({
            message: "Error fetching product",
            error: error.message,
        });
    }
};

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, desc, price, imgUrl } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.name = name || product.name;
        product.desc = desc || product.desc;
        product.price = price || product.price;
        product.imgUrl = imgUrl || "No img";
        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            data: product,
        });
        next()
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message,
        });
    }
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.destroy();
        res.status(200).json({ message: "Product deleted successfully" });
        next()
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message,
        });
    }
};

module.exports = {
    createProductImg,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    creatPro,
};
