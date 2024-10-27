class ProductController {
    async createProduct(req, res) {
        try {
          const { product_name, description, category_name, image_url, new_price, old_price } = req.body;
          const newProduct = await User.create({ product_name: product_name, description: description, category_name: category_name, image_url: image_url, new_price: new_price, old_price: old_price });
          res.json(newProduct);
        } catch (error) {
          res.status(500).json({ message: 'Error creating user', error });
        }
    }

    async getPostByUser(req, res) {

    }
}

module.exports = new ProductController()