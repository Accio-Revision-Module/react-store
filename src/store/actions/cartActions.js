import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/add",
  async (productId, thunkAPI) => {
    const currentUser = auth.currentUser;
    try {
      const collectionRef = collection(db, "cart");
      await addDoc(collectionRef, {
        productId: productId,
        userId: currentUser.uid,
      });

      thunkAPI.dispatch(fetchCart());
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, thunkAPI) => {
    try {
      const collectionRef = collection(db, "cart");
      const q = query(collectionRef, where("productId", "==", productId));
      const snapshot = await getDocs(q);
      const docRef = doc(db, "cart", snapshot.docs[0].id);
      await deleteDoc(docRef);

      thunkAPI.dispatch(fetchCart());
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  },
);

export const fetchCart = createAsyncThunk("cart/fetch", async (_, thunkAPI) => {
  const currentUser = auth.currentUser;
  try {
    const collectionRef = collection(db, "cart");
    const q = query(collectionRef, where("userId", "==", currentUser.uid));

    const querySnapshot = await getDocs(q);
    const productIds = [];
    querySnapshot.docs.forEach((doc) => {
      productIds.push(doc.data().productId);
    });

    const url = "https://fakestoreapi.com/products";
    const products = [];
    for (let id of productIds) {
      const res = await axios.get(url + `/${id}`);
      products.push(res.data);
    }

    return {
      productIds,
      products,
    };
  } catch (e) {
    thunkAPI.rejectWithValue(e);
  }
});
