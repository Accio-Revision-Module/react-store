/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from './style.module.css'
import { useDispatch } from 'react-redux';
import { filter } from '../../store/slices/productsSlice';
import useDebounce from '../../hooks/useDebounce';

function Header() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const debounce = useDebounce(() => dispatch(filter(search)), 250);
  
  useEffect(() => {
    debounce();
  }, [search])
    
  return (
    <header>
        <div className={styles.brand}>All Store</div>
        <input type="text" placeholder="Search for Products" value={search} onChange={(e) => setSearch(e.target.value)} />
    </header>
  )
}

export default Header