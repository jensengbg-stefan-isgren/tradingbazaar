import styled from 'styled-components'
import { addProduct } from '../services/collections'
import { useDispatch, useSelector } from 'react-redux'
import { adInputEdit } from 'features/newAdSlice'

const AddAd = () => {
  const dispatch = useDispatch()
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
  } = useSelector((state) => state.newAd)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (
      !title ||
      !description ||
      !category ||
      !startPrice ||
      !acceptedPrice ||
      !productConditions ||
      !adEndDate
    )
      return alert('Fill all the fields in the Form')

    addProduct({
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
    })
  }

  return (
    <StyledAddProduct>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            id="inputName"
            value={title}
            maxLength={50}
            onChange={(e) =>
              dispatch(adInputEdit({ field: 'title', value: e.target.value }))
            }
          />
          <span className="input-length">{title.length} / 50</span>
        </div>
        <div className="input-container">
          <label htmlFor="inputDescription">Description</label>
          <textarea
            id="inputDescription"
            maxLength={500}
            onChange={(e) =>
              dispatch(
                adInputEdit({ field: 'description', value: e.target.value })
              )
            }
            cols={30}
            rows={5}
            value={description}
          />
          <span className="input-length">{description.length} / 500</span>

          {/* <input
            type="text"
            id="inputDescription"
            value={description}
            onChange={(e) =>
              dispatch(
                adInputEdit({ field: 'description', value: e.target.value })
              )
            }
          /> */}
        </div>
        <div className="input-container">
          <label htmlFor="inputCategory">Category</label>
          <input
            type="text"
            id="inputCategory"
            value={category}
            onChange={(e) =>
              dispatch(
                adInputEdit({ field: 'category', value: e.target.value })
              )
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="inputStartPrice">Start Price</label>
          <input
            type="number"
            id="inputStartPrice"
            value={startPrice}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'startPrice',
                  value: Number(e.target.value),
                })
              )
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="inputAcceptedPrice">Accepted Price</label>
          <input
            type="number"
            id="inputAcceptedPrice"
            value={acceptedPrice}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'acceptedPrice',
                  value: Number(e.target.value),
                })
              )
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="selectCondition">Product Conditions</label>
          <select
            id="selectCondition"
            value={productConditions}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'productConditions',
                  value: e.target.value,
                })
              )
            }
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="New">New</option>
            <option value="As New">As New</option>
            <option value="Used">Used</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="inputEndDate">End Date</label>
          <input
            type="number"
            id="inputAcceptedPrice"
            value={adEndDate}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'adEndDate',
                  value: Number(e.target.value),
                })
              )
            }
          />
        </div>
        <div className="input-container">
          <label htmlFor="imgLink1">Image Url</label>
          <input
            type="url"
            id="imgLink1"
            value={imgLink1}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'imgLink1',
                  value: e.target.value,
                })
              )
            }
          />
          {imgLink1 ? (
            <div className="image-container">
              <img src={imgLink1} alt={`${title} - image_1`}></img>
            </div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            imgLink1 == null || !imgLink1 ? 'hidden' : ''
          }`}
        >
          <label htmlFor="imgLink2">Image 2 Url</label>
          <input
            type="url"
            id="imgLink2"
            value={imgLink2}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'imgLink2',
                  value: e.target.value,
                })
              )
            }
          />
          {imgLink2 ? (
            <div className="image-container">
              <img src={imgLink2} alt={`${title} - image_2`}></img>
            </div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            imgLink2 == null || !imgLink2 ? 'hidden' : ''
          }`}
        >
          <label htmlFor="imgLink3">Image 3 Url</label>
          <input
            type="url"
            id="imgLink3"
            value={imgLink3}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'imgLink3',
                  value: e.target.value,
                })
              )
            }
          />
          {imgLink3 ? (
            <div className="image-container">
              <img src={imgLink3} alt={`${title} - image_3`}></img>
            </div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            imgLink3 == null || !imgLink3 ? 'hidden' : ''
          }`}
        >
          <label htmlFor="imgLink4">Image 4 Url</label>
          <input
            type="url"
            id="imgLink4"
            value={imgLink4}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'imgLink4',
                  value: e.target.value,
                })
              )
            }
          />
          {imgLink4 ? (
            <div className="image-container">
              <img src={imgLink4} alt={`${title} - image_4`}></img>
            </div>
          ) : null}
        </div>
        <div
          className={`input-container ${
            imgLink4 == null || !imgLink4 ? 'hidden' : ''
          }`}
        >
          <label htmlFor="imgLink5">Image 5 Url</label>
          <input
            type="url"
            id="imgLink5"
            value={imgLink5}
            onChange={(e) =>
              dispatch(
                adInputEdit({
                  field: 'imgLink5',
                  value: e.target.value,
                })
              )
            }
          />
          {imgLink5 ? (
            <div className="image-container">
              <img src={imgLink5} alt={`${title} - image_5`}></img>
            </div>
          ) : null}
        </div>
        <div>
          <input type="submit" value="Add Product" />
        </div>
      </form>
    </StyledAddProduct>
  )
}

const StyledAddProduct = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    padding: 1em;
  }

  form {
    display: flex;
    flex-direction: column;

    .input-container {
      padding: 0.2em;
      margin: 0.3em;
      position: relative;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .input-length {
        font-size: 0.7em;
        position: absolute;
        top: -0.8em;
        right: 0;
      }
    }
    input,
    textarea,
    select {
      width: 70%;
      flex-grow: 1;
      margin: 0;
    }
    textarea {
      resize: vertical;
    }

    label {
      width: 30%;
      padding: 0.5em;
    }

    .image-container {
      img {
        max-width: 20em;
      }
    }

    .hidden {
      display: none;
    }
  }

  @media (min-width: 768px) {
  }
`

export default AddAd
