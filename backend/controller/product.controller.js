const Product = require('../models/product')

class ProductController {
    async createProduct(req, res) {
        try {
          const newProduct = await Product.create(req.body);
          res.json(newProduct);
        } catch (error) {
          console.error("Ошибка добавления продукта:", error); 
          res.status(500).json({ message: 'Error creating product', error });
        }
    }

    async getProducts(req, res) {
      try {
        const products = await Product.findAll();
        if (products) {
          res.json(products)
        } else {
          res.status(404).json({ message: "Products not found", error });
        }
      } catch (error) {
        res.status(500).json({ message: "Ошибка получения товаров", error })
      }
    }

    async getProduct(req, res) {
      console.log("Запрос получен для product_id:", req.params.product_id);
      try {
        const id = req.params.product_id;
        const product = await Product.findByPk(id);
        if (product) {
          res.json(product)
        } else {
          res.status(404).json({ message: "Product not found", error });
        }
      } catch (error) {
        res.status(500).json({ message: "Ошибка получения товара", error })
      }
    }

    // async updateProduct(req, res) {
    //   try {
    //     const id = req.body.product_id
    //     const product = await Product.findAll(id);
    //     if (product) {
    //       res.json(product)
    //     } else {
    //       res.status(404).json({ message: "Product not found", error });
    //     }
    //   } catch (error) {
    //     res.status(500).json({ message: "Ошибка получения товара", error })
    //   }
    // }

    async deleteProduct(req, res) {
      try {
        const id = req.body.product_id
        const product = await Product.destroy({ where: { product_id: id } });
        if (product) {
          res.json({ message: 'Product deleted' });
        } else {
          res.status(404).json({ message: "Product not found", error });
        }
      } catch (error) {
        res.status(500).json({ message: "Ошибка удаления товара", error })
      }
    }
}

module.exports = new ProductController()