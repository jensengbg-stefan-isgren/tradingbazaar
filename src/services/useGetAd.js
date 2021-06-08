import { db } from '../services/firebase';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProduct, clearProduct } from 'features/productSlice';

const UseGetAd = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unSubscribe = db
      .collection('sellingProducts')
      .doc(id)
      .onSnapshot((doc) => dispatch(getProduct({ id, ad: doc.data() })));

    return () => {
      unSubscribe();
      dispatch(clearProduct());
    };
  }, [dispatch, id]);
};

export default UseGetAd;
