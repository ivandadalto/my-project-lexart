const { Product } = require('../models');

// const createProduct = async (req, res) => {
//   try {
//     const { name, brand, model, price, color } = req.body;
//     const product = await Product.create({ name, brand, model, price, color });
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const createProduct = async (req, res) => {
  try {
    const data = req.body;

    if (Array.isArray(data)) {
      const products = await Promise.all(data.map(async (item) => {
        const { name, brand, model, data: productData } = item;
        return Promise.all(productData.map(async (entry) => {
          const product = await Product.create({ name, brand, model, price: entry.price, color: entry.color });
          return product;
        }));
      }));

      res.status(201).json({ message: 'Produtos inseridos com sucesso', products: products.flat() });
    } else if (data.details) {
      const { name, details, price } = data;
      const { brand, model, color } = details;
      const product = await Product.create({ name, brand, model, price, color });
      res.status(201).json({ message: 'Produto inserido com sucesso', product });
    } else {
      const { name, brand, model, price, color } = data;
      const product = await Product.create({ name, brand, model, price, color });
      res.status(201).json({ message: 'Produto inserido com sucesso', product });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, model, price, color } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name;
    product.brand = brand;
    product.model = model;
    product.price = price;
    product.color = color;
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
