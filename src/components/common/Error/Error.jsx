/* eslint-disable react/prop-types */
import styles from './style.module.css';

function Error({error}) {
  return (
    <div>
        <p className={styles.error}>{error}</p>
    </div>
  )
}

export default Error