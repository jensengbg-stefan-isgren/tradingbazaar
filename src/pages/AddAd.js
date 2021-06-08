import styled from 'styled-components';
import { addProduct } from '../services/collections';
import { useDispatch, useSelector } from 'react-redux';
import { adInputEdit, checkImages, clearAd } from 'features/newAdSlice';
import { useRef, useState } from 'react';
import Modal from 'components/Modal';
import placeholder from 'assets/images/img-placeholder.svg';
import useProtectedRoute from 'functions/useProtectedRoute';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const AddAd = () => {
  const history = useHistory();
  useProtectedRoute();

  document.title = 'Trading Bazaar | Add Ad';

  const addAd1 = useRef(null);
  const addAd2 = useRef(null);
  const stepBtnRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    addAd1.current.classList.toggle('slide');
    addAd2.current.classList.toggle('slide');
    stepBtnRef.current.innerText = stepBtnRef.current.innerText
      .toLowerCase()
      .includes('next')
      ? 'Previous Step'
      : 'Next Step';
  };

  const dispatch = useDispatch();
  const {
    title,
    description,
    category,
    startPrice,
    acceptedPrice,
    productConditions,
    adEndDate,
    imgLink1,
    imgLink2,
    imgLink3,
    imgLink4,
    imgLink5,
  } = useSelector((state) => state.newAd);

  const { categories } = useSelector((state) => state.categories);
  const getImgRef = (field) => {
    switch (field) {
      case 'imgLink1':
        return imgLink1;
      case 'imgLink2':
        return imgLink2;
      case 'imgLink3':
        return imgLink3;
      case 'imgLink4':
        return imgLink4;
      case 'imgLink5':
        return imgLink5;
      default:
    }
  };
  const [currentImg, setCurrentImg] = useState('imgLink1');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !title ||
      !description ||
      !category ||
      !startPrice ||
      !acceptedPrice ||
      !productConditions ||
      !adEndDate ||
      !imgLink1
    )
      return toast.info('Please fill all the fields in the Form');
    dispatch(checkImages());
    const docRef = await addProduct();
    dispatch(clearAd());
    history.push(`/item/${docRef}`);
  };

  return (
    <>
      <StyledAddProduct>
        <header>
          <h1>Create new Ad</h1>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
            <section ref={addAd1} id="addAd1">
              <h2>1. Describe your product</h2>
              <InputContainer>
                <label className="std-label" htmlFor="inputName">
                  Title
                </label>
                <input
                  className="input-content"
                  type="text"
                  id="inputName"
                  value={title}
                  maxLength={50}
                  onChange={(e) =>
                    dispatch(
                      adInputEdit({ field: 'title', value: e.target.value })
                    )
                  }
                />
                <span className="input-length">{title.length} / 50</span>
              </InputContainer>
              <InputContainer>
                <label className="std-label" htmlFor="inputDescription">
                  Description
                </label>
                <textarea
                  className="input-content"
                  id="inputDescription"
                  maxLength={500}
                  onChange={(e) =>
                    dispatch(
                      adInputEdit({
                        field: 'description',
                        value: e.target.value,
                      })
                    )
                  }
                  cols={30}
                  rows={5}
                  value={description}
                />
                <span className="input-length">{description.length} / 500</span>
              </InputContainer>
              <InputContainer>
                <label className="std-label" htmlFor="inputCategory">
                  Category
                </label>
                {categories ? (
                  <select
                    className="input-content"
                    value={category}
                    onChange={(e) =>
                      dispatch(
                        adInputEdit({
                          field: 'category',
                          value: e.target.value,
                        })
                      )
                    }
                    name="category"
                    id="category"
                  >
                    {categories.map((category) => {
                      return (
                        <option key={category.name} value={category.name}>
                          {category.name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  ''
                )}
              </InputContainer>
              <InputContainer>
                <p className="std-label">Product Conditions</p>
                <div className="input-content radiogroup-wrap">
                  <div className=" input-radio-cont">
                    <input
                      type="radio"
                      name="conditions"
                      value="New"
                      id="chk-new"
                      checked={productConditions === 'New'}
                      onChange={(e) =>
                        dispatch(
                          adInputEdit({
                            field: 'productConditions',
                            value: e.target.value,
                          })
                        )
                      }
                    />
                    <label className="btn" htmlFor="chk-new">
                      New
                    </label>
                  </div>
                  <div className="input-radio-cont">
                    <input
                      type="radio"
                      name="conditions"
                      value="As New"
                      id="chk-asnew"
                      checked={productConditions === 'As New'}
                      onChange={(e) =>
                        dispatch(
                          adInputEdit({
                            field: 'productConditions',
                            value: e.target.value,
                          })
                        )
                      }
                    />
                    <label className="btn" htmlFor="chk-asnew">
                      As New
                    </label>
                  </div>
                  <div className="input-radio-cont">
                    <input
                      type="radio"
                      name="conditions"
                      value="Used"
                      id="chk-used"
                      checked={productConditions === 'Used'}
                      onChange={(e) =>
                        dispatch(
                          adInputEdit({
                            field: 'productConditions',
                            value: e.target.value,
                          })
                        )
                      }
                    />
                    <label className="btn" htmlFor="chk-used">
                      Used
                    </label>
                  </div>
                </div>
              </InputContainer>
              <InputContainer>
                <p className="std-label">Pictures</p>
                <div className="input-content">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImg('imgLink1');
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={imgLink1 || placeholder} alt="placeholder"></img>
                  </button>

                  <button
                    className={`${
                      (imgLink1 == null || !imgLink1) & !imgLink2
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImg('imgLink2');
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={imgLink2 || placeholder} alt="placeholder"></img>
                  </button>

                  <button
                    className={`${
                      (imgLink2 == null || !imgLink2) & !imgLink3
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImg('imgLink3');
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={imgLink3 || placeholder} alt="placeholder"></img>
                  </button>

                  <button
                    className={`${
                      (imgLink3 == null || !imgLink3) & !imgLink4
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImg('imgLink4');
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={imgLink4 || placeholder} alt="placeholder"></img>
                  </button>

                  <button
                    className={`${
                      (imgLink4 == null || !imgLink4) & !imgLink5
                        ? 'hidden'
                        : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImg('imgLink5');
                      setShowModal(!showModal);
                    }}
                  >
                    <img src={imgLink5 || placeholder} alt="placeholder"></img>
                  </button>

                  {showModal ? (
                    <ModalContainer
                      imgRef={getImgRef(currentImg)}
                      imgName={currentImg}
                      onClick={() => setShowModal(!showModal)}
                      onChange={(value) =>
                        dispatch(
                          adInputEdit({
                            field: currentImg,
                            value: value,
                          })
                        )
                      }
                    />
                  ) : null}
                  {/* {imgLink1 ? (
                  <div className="image-container">
                    <img src={imgLink1} alt={`${title} - image_1`}></img>
                  </div>
                ) : null} */}
                </div>
              </InputContainer>
            </section>
            <section ref={addAd2} id="addAd2" className="slide">
              <h2>2. Price and Time</h2>

              <InputContainer>
                <label className="std-label" htmlFor="inputStartPrice">
                  Start Price
                </label>
                <input
                  className="input-content"
                  type="number"
                  id="inputStartPrice"
                  value={startPrice}
                  placeholder="100"
                  onChange={(e) => {
                    if (Number(e.target.value) === 0 || !e.target.value) {
                      e.target.value = 0;
                      e.target.select();
                    }
                    dispatch(
                      adInputEdit({
                        field: 'startPrice',
                        value: Number(e.target.value),
                      })
                    );
                  }}
                />
                <span className="valuta-text">Kr</span>
              </InputContainer>
              <InputContainer>
                <label className="std-label" htmlFor="inputAcceptedPrice">
                  Accepted Price
                </label>
                <input
                  className="input-content"
                  type="number"
                  id="inputAcceptedPrice"
                  value={acceptedPrice}
                  onChange={(e) => {
                    if (Number(e.target.value) === 0 || !e.target.value) {
                      e.target.value = 0;
                      e.target.select();
                    }
                    dispatch(
                      adInputEdit({
                        field: 'acceptedPrice',
                        value: Number(e.target.value),
                      })
                    );
                  }}
                />
                <span className="valuta-text">Kr</span>
              </InputContainer>

              <InputContainer>
                <label className="std-label" htmlFor="inputEndDate">
                  End Date
                </label>
                <input
                  type="datetime-local"
                  id="inputEndDate"
                  value={adEndDate}
                  className="input-content"
                  onChange={(e) => {
                    if (!e.target['validity'].valid) return;
                    const dt = e.target['value'];
                    dispatch(
                      adInputEdit({
                        field: 'adEndDate',
                        value: dt,
                      })
                    );
                  }}
                />
              </InputContainer>
            </section>
            <div className="btn-group">
              <button ref={stepBtnRef} onClick={handleNextStep}>
                Next Step
              </button>
              <input
                type="submit"
                value="Add Product"
                disabled={
                  !title ||
                  !description ||
                  !category ||
                  !startPrice ||
                  !acceptedPrice ||
                  !productConditions ||
                  !adEndDate ||
                  !imgLink1
                }
              />
            </div>
          </form>
        </main>
      </StyledAddProduct>
    </>
  );
};

const ModalContainer = ({ imgRef, imgName, onClick, onChange }) => {
  const inputRef = useRef(null);
  return (
    <Modal>
      <InputContainer>
        <label className="std-label" htmlFor={`${imgName}`}>
          Image Url
        </label>
        <input
          className="input-content"
          ref={inputRef}
          type="url"
          id={`${imgName}`}
          value={imgRef}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className="modal-btn" onClick={() => onChange('')}>
          Clear
        </button>
        <button className="modal-btn" onClick={onClick}>
          Close
        </button>
      </InputContainer>
    </Modal>
  );
};

const InputContainer = styled.div`
  font-size: 0.8em;
  width: 95vw;
  max-width: 30em;
  padding: 0.2em;
  margin: 0.9em 0.3em;
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /* box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.4); */

  input,
  textarea {
    outline: none;
  }
  .input-length {
    font-size: 0.7em;
    position: absolute;
    top: 0.95em;
    right: 0.3em;
  }

  .valuta-text {
    position: absolute;
    right: 1.25em;
    bottom: 0.5em;
  }

  .radiogroup-wrap {
    width: 100%;
    display: inline-flex;
    flex-wrap: wrap;
    gap: 0.4em;
    /* justify-content: space-between; */

    .input-radio-cont {
      flex-grow: 1;
      position: relative;
      display: flex;
      align-items: center;

      label {
        flex-grow: 1;
      
        min-width: 6em;
        padding: 0.3em 0.5em;
        text-align: center;
        cursor: pointer;
      }

      input[type='checkbox'],
      input[type='radio'] {
        /* visibility: hidden; */
        opacity: 0;
        position: absolute;

        width: 100%;
        /* height: 100%; */

        &:checked + label {
   
        }

        &:focus + label {
     
          padding: 0.2em 0.4em;
        }
      }
    }
  }

  .input-content {
    padding: 0.2em 0.2em;
    font-size: 1em;
    width: 100%;
    flex-grow: 1;
    margin: 0;
  }

  input:not([type='checkbox']):not([type='radio']):not([type='submit']),
  textarea,
  select {
    border: 0.2rem solid #424242;

    &:focus,
    &:active {
      padding: 0.1em 0.1em;
    }
  }
  textarea {
    resize: vertical;
  }

  .std-label {
    /* width: 30%; */
    /* padding: 0.5em; */
    /* position: absolute; */
    /* background: white; */
    /* left: 0.5em; */
    /* top: 0.4em; */
  }

  img {
    /* max-width: 10em; */
    width: 5em;
  }
  .image-container {
  }
  .hidden {
    display: none;
  }
  &.hidden {
    display: none;
  }

  .modal-btn {
    padding: 0.2em 0.7em;
    margin: 0.4em;
  }
`;

const StyledAddProduct = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2,
  h3 {
    padding: 0.5em;
  }

  form {
    /* display: flex;
    flex-direction: column; */
    /* display: inline; */
    /* overflow-x: hidden; */
    position: relative;
    width: 100vw;
    min-height: 70vh;
    display: flex;
    overflow-x: hidden;
    overflow-y: auto;
    /* left: 50%; */

    #addAd1 {
      position: absolute;
      /* width: 100vw; */
      left: 50%;
      transition: transform 0.3s ease;

      > * {
        position: relative;
        left: -50%;
      }
      &.slide {
        transform: translateX(-100vw);
      }
    }
    #addAd2 {
      position: absolute;
      left: 50%;
      transition: transform 0.3s ease;
      transform: translateX(0);

      > * {
        position: relative;
        left: -50%;
      }
      &.slide {
        transform: translateX(100vw);
      }
    }

    .btn-group {
      padding: 1em 0.5em;
      background: white;
      position: fixed;
      bottom: 2em;
      right: 1em;
      width: 8em;

      & > * {
        width: 100%;
      }
    }
  }

  @media (min-width: 768px) {
  }
`;

export default AddAd;
