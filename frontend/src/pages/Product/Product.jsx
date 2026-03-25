import useFetch from '../../hooks/useFetch';

export default function Product() {
  const { data, loading, error } = useFetch('/products');

  if (loading) return <div>Loading high-quality products...</div>;
  if (error) return <div>Failed to load products. Please try again.</div>;
  if (!data || data.length === 0) return <div>No products found.</div>;
  return (
    <div className="product-grid">
      {data.map((product) => (
        <div key={product._id} className="product-card">
          <h2>{product.brand}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}
