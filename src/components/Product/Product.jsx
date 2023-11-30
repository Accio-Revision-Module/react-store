/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import styles from './style.module.css'
import { addToCart, removeFromCart } from '../../store/actions/cartActions';
import { useState } from 'react';

function Product({product, isInCart = false}) {
  const [inCart, setInCart] = useState(isInCart);
  const dispatch = useDispatch();

  const handleToggle = () => {
    if(!inCart) {
      dispatch(addToCart(product.id));
      setInCart(true);
    } else {
      dispatch(removeFromCart(product.id))
    }
  }

  return (
    <div className={styles.product}>
        <img src={product.image} />
        <div className={styles.info}>
            <div className={styles.name}>
                {product.title}
            </div>
            <div className={styles.description}>
            {product.description}
            </div>
            <div className={styles.name}>
                ₹{product.price}
            </div>
            <button onClick={handleToggle}>{inCart ? "Remove From Cart" : "Add To Cart"}</button>
        </div>
    </div>
  )
}

export default Product