const { Router } = require("express");
const router = Router();
const { checkAccess } = require("../middleware/midle");
const upload = require("../multer/maltr");
const {
    deleteProProLoger,
    updateProLoger,
    getOneIdProProLoger,
} = require("../logger");

const {
    creatPro,
    createProductImg,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controller/proController");
router.post("/product", checkAccess(["admin"], ["Activated"]), creatPro, () => {
    createProLoger("info", "product created");
});

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: APIs for managing products
 */

/**
 * @swagger
 * /productImg:
 *   post:
 *     tags: [Product]
 *     summary: Create a product with an image
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Image file is required
 *       500:
 *         description: Error creating product
 */
router.post(
    "/productImg",
    checkAccess(["admin"], ["Activated"]),
    upload.single("file"),
    createProductImg,
    () => {
        createProLoger("info", "product created");
    }
);

/**
 * @swagger
 * /getAllPro:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   price:
 *                     type: number
 *                   imageUrl:
 *                     type: string
 *       500:
 *         description: Error fetching products
 */
router.get("/getAllPro", getAllProducts, () => {
    getOneIdProProLoger("info", "get all products");
});

/**
 * @swagger
 * /getPro/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 price:
 *                   type: number
 *                 imageUrl:
 *                   type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product
 */
router.get("/getPro/:id", getProductById, () => {
    getOneIdProProLoger("info", "get product with id");
});

/**
 * @swagger
 * /updatePro/{id}:
 *   patch:
 *     tags: [Product]
 *     summary: Update a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               imgUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.patch(
    "/updatePro/:id",
    checkAccess(["admin", "super-admin"], ["Activated"]),
    updateProduct,
    () => {
        updateProLoger("info", "updated product");
    }
);

/**
 * @swagger
 * /delPro/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete(
    "/delPro/:id",
    checkAccess(["admin"], ["Activated"]),
    deleteProduct,
    () => {
        deleteProProLoger("info", "deleted product");
    }
);

module.exports = router;


