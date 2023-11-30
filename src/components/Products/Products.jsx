/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { fetchProducts } from '../../store/actions/productsActions';
import Product from '../Product/Product'
import Loading from '../common/Loading/Loading';
import styles from './style.module.css'
import { useDispatch, useSelector } from 'react-redux';

function Products() {
  const dispatch = useDispatch();
  const {loading, products} = useSelector((state) => state.products)
  const {cartIds} = useSelector((state) => state.cart);

  useEffect(() => {
    if(cartIds && cartIds.length > 0) 
      dispatch(fetchProducts());
  }, [cartIds])

  if(loading) {
    return <Loading />
  }

  return (
    <div className={styles.products}>
        <div className={styles.title}>
        Products
        </div>


        <div className={styles.list}>
          {products.map((product, i) => (
            <Product key={i} product={product} isInCart={cartIds?.includes(product.id)} />
          ))}
        </div>

    </div>
  )
}

export default Products