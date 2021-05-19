import styled from 'styled-components'
import { addProduct } from '../services/collections'
import { useDispatch, useSelector } from 'react-redux'
import { adInputEdit, checkImages } from 'features/newAdSlice'

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
      !adEndDate ||
      !imgLink1
    )
      return alert('Fill all the fields in the Form')
    console.log('checkimg', checkImages)
    dispatch(checkImages())
    addProduct()
  }

  return (
    <StyledAddProduct>
      <header>
        <h1>Create new Ad</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <section>
            <h2>1. Describe your product</h2>
            <div className="input-container">
              <label className="std-label" htmlFor="inputName">
                Title
              </label>
              <input
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
            </div>
            <div className="input-container">
              <label className="std-label" htmlFor="inputDescription">
                Description
              </label>
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
            </div>
            <div className="input-container">
              <label className="std-label" htmlFor="inputCategory">
                Category
              </label>
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
              <p className="std-label">Product Conditions</p>
              <div className="radiogroup-wrap">
                <div className="input-radio-cont">
                  <input
                    type="radio"
                    name="conditions"
                    value="New"
                    id="chk-new"
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
            </div>
            {/* <div className="input-container">
              <label className="std-label" htmlFor="selectCondition">
                Product Conditions
              </label>
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
            </div> */}
            <div className="input-container">
              <label className="std-label" htmlFor="imgLink1">
                Image Url
              </label>
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
                (imgLink1 == null || !imgLink1) & !imgLink2 ? 'hidden' : ''
              }`}
            >
              <label className="std-label" htmlFor="imgLink2">
                Image 2 Url
              </label>
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
                (imgLink2 == null || !imgLink2) && !imgLink3 ? 'hidden' : ''
              }`}
            >
              <label className="std-label" htmlFor="imgLink3">
                Image 3 Url
              </label>
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
              <label className="std-label" htmlFor="imgLink4">
                Image 4 Url
              </label>
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
                (imgLink4 == null || !imgLink4) && !imgLink5 ? 'hidden' : ''
              }`}
            >
              <label className="std-label" htmlFor="imgLink5">
                Image 5 Url
              </label>
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
          </section>
          <section>
            <h2>2. Price and Time</h2>

            <div className="input-container">
              <label className="std-label" htmlFor="inputStartPrice">
                Start Price
              </label>
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
              <label className="std-label" htmlFor="inputAcceptedPrice">
                Accepted Price
              </label>
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
              <label className="std-label" htmlFor="inputEndDate">
                End Date
              </label>
              <input
                type="datetime-local"
                id="inputEndDate"
                value={adEndDate}
                onChange={(e) => {
                  if (!e.target['validity'].valid) return
                  const dt = e.target['value']
                  dispatch(
                    adInputEdit({
                      field: 'adEndDate',
                      value: dt,
                    })
                  )
                }}
              />
            </div>
          </section>

          <div>
            <input type="submit" value="Add Product" />
          </div>
        </form>
      </main>
    </StyledAddProduct>
  )
}

const StyledAddProduct = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1,
  h2,
  h3 {
    padding: 1em;
  }

  input,
  textarea {
    outline: none;
  }

  form {
    display: flex;
    flex-direction: column;

    .input-container {
      width: 95vw;
      max-width: 30em;
      padding: 0.2em;
      margin: 0.9em 0.3em;
      position: relative;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      /* box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.4); */

      .input-length {
        font-size: 0.7em;
        position: absolute;
        top: -0.85em;
        right: 0.3em;
      }
    }
    .radiogroup-wrap {
      width: 70%;
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
          border: 0.2em solid ${(props) => props.theme.button.bckDark};
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
            background: ${(props) => props.theme.button.bckDark};
            color: ${(props) => props.theme.button.color};
          }

          &:focus + label {
            border: 0.3em solid ${(props) => props.theme.button.outline};
            padding: 0.2em 0.4em;
          }
        }
      }
    }

    input:not([type='checkbox']):not([type='radio']),
    textarea,
    select {
      padding: 0.2em 0.2em;
      font-size: 0.8em;
      border: 0.2em solid #424242;
      width: 70%;
      flex-grow: 1;
      margin: 0;

      &:focus,
      &:active {
        border: 0.3em solid ${(props) => props.theme.button.outline};
        padding: 0.1em 0.1em;
      }
    }
    textarea {
      resize: vertical;
    }

    .std-label {
      width: 30%;
      padding: 0.5em;
    }

    .image-container {
      img {
        max-width: 10em;
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
