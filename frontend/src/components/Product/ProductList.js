import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <Link to="/add-product">Add Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.brand} - {product.model} - ${product.price} - {product.color}
            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
