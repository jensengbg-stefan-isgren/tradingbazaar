import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addDetailedProduct } from "features/productSlice";
import { db } from "services/firebase";

const Wrapper = styled.div`
  height: auto;
  width: auto;
  display: grid;
  justify-content: center;
`;

const Container = styled.div`
  margin-top: 4em;
  height: auto;
  width: auto;
  background-color: pink;
  display:grid;
  padding:1em;
  

  
  grid-template-areas: 
  "title title title title"
  "image image bid bid"
  "image image bid bid"
  "con con . ."
  "desc desc . ."
  ". . input input"
  ". . bidbutton bidbutton"
  ". . savebtn savebtn"
  ". . buynow buynow";

.description-container {
  grid-area:desc;
}
  

  .title-container {
    grid-area: title;
  }

  .image-container {
    margin:1em 0;
    grid-area: image;

    img {
      width:600px;
      height:100%;
      object-fit: cover;
    }
  }

  .price-section {
    grid-area: bid;
    padding-left:1em;
    margin:1em 0;
  }

  .price-container,.time-container,.bid-container {
    display:flex;
    gap:1em;
    justify-content:space-between;
  }

  .button {
    display:block;
    
    .bid {
      grid-area:bidbutton;
    }

    .save {
      grid-area:savebtn;
    }

    .buy.now {
      grid-area:buynow
    }
  }


`;

const ProductDetailsCard = () => {
  const { detailedProduct } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(async () => {
    const snapshot = await db.collection("sellingProducts").doc(id).get();
    const data = await snapshot.data();
    dispatch(addDetailedProduct(data));
    return () => {};
  }, []);

  return (
    <Wrapper>
      {detailedProduct ? (
        <Container>
          <div className="title-container">
            <h4>{detailedProduct.title}</h4>
          </div>
          <div className="image-container">
            <img src={detailedProduct.imgLink1} alt="" />
          </div>
          <div className="condition-container">
            <h4>Condition</h4>
            <p>{detailedProduct.productConditions}</p>
          </div>
          <div className="description-container">
            <h4>Description</h4>
            <p>{detailedProduct.description}</p>
          </div>
          <div className="price-section">
            <div className="price-container">
              <p>Utropspris</p>
              <p>{detailedProduct.startPrice}kr</p>
            </div>
            <div className="time-container">
              <p>Slutar den 123</p>
              <p>{detailedProduct.adEndDate}</p>
            </div>
            <div className="bid-container">
              <p>Bids</p>
              <p>0st</p>
            </div>
            <input className="input" type="text" placeholder="Enter your price" />
            <button className="button bid">Add bid</button>
            <button className="button save">Save</button>
            <button className="button buy-now">Buy now {detailedProduct.acceptedPrice} kr</button>
          </div>
        </Container>
      ) : (
        ""
      )}
    </Wrapper>
  );
};

export default ProductDetailsCard;
