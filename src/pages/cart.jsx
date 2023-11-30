/* eslint-disable react-hooks/exhaustive-deps */
import {  useSelector } from 'react-redux'
import Product from '../components/Product/Product'
import styles from '../styles/cart.module.css'
import Loading from '../components/common/Loading/Loading';
import { useCallback, useMemo } from 'react';
import useRazorpay from 'react-razorpay';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';

function Cart() {
  const [user] = useAuthState(auth)
  const {loading, cart} = useSelector((state) => state.cart);
  const amount = useMemo(() => cart.reduce((acc, curr) => acc + curr.price, 0), [cart])

  const [Razorpay] = useRazorpay();

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_vd4t1iDt7n6JUB",
      amount,
      currency: "INR",
      name: "All Store",
      description: "Buy everything in the cart",
      image: "https://example.com/your_logo",
      order_id: "order_N6krSJobLbzw46",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        email: user.email,
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay, user]);

  if(loading) {
    return <Loading />
  }

  return (
    <main>
        <h1>Cart</h1>
        <p>Total: ₹{amount}</p>
        <button onClick={handlePayment}>Checkout</button>
        <div className={styles.list}>
          {cart?.map((product, i) => (
            <Product key={i} product={product} isInCart={true} />
          ))}
        </div>
    </main>
  )
}

export default Cart