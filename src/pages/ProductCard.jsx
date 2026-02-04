import supabase from '../config/supabaseClient'

const ProductCard = ({ product, onDelete }) => {

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from('Product')
      .delete()
      .eq('id', product.id)
    
    if (error) {
      console.log(error)
    }
    
    if (data || !error) { // Supabase delete doesn't always return data if items are deleted, check logic
        // But if error is null it usually means success
      console.log(data)
      onDelete(product.id)
    }
  }

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
        
        <div className="product-card__actions">
            <button className="product-card__btn product-card__btn--delete" onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i>
            </button>
            <button className="product-card__btn">
            Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
