import React, { useState, useEffect } from 'react';
import { getProducts } from '../api.js';
import { useCart } from '../hooks/useCart.js';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch assets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center" style={{ padding: '100px' }}>Syncing with asset database...</div>;

  return (
    <div className="animate-fade">
      <header style={{ marginBottom: '60px' }}>
        <h1 style={{ fontSize: '42px' }}>Available <span className="text-primary">Assets</span></h1>
        <p className="text-muted">Direct procurement from verified Zero Trust manufacturers.</p>
      </header>

      <div className="grid grid-3">
        {products.map(product => (
          <div key={product._id} className="card product-card">
            <div className="product-img-wrapper">
              <img src={product.image} alt={product.name} className="product-img" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '18px' }}>{product.name}</h3>
              <span className="product-price">${product.price}</span>
            </div>
            <p className="text-muted" style={{ fontSize: '13px', marginBottom: '20px', minHeight: '40px' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {product.tags?.map(tag => (
                <span key={tag} style={{ 
                  fontSize: '10px', 
                  padding: '2px 8px', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  textTransform: 'uppercase'
                }}>{tag}</span>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => addItem(product)}>
              Secure in Container
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
