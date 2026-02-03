const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__header">
        <h2 className="product-card__title">{product.title}</h2>
        <span className="product-card__price">${product.price}</span>
      </div>

      <p className="product-card__description">
        {product.description}
      </p>

      <div className="product-card__footer">
        <span className="product-card__location">
          📍 {product.location}
        </span>

        <button className="product-card__btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
