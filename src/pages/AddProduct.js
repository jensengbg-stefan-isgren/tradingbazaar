import { useState } from 'react'
import styled from 'styled-components'
import { addProduct } from '../services/collections'

const AddProduct = () => {
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submit!')
    addProduct(product)
  }

  const [product, setProduct] = useState({
    title: '',
    price: 0.0,
    category: '',
    description: '',
  })

  return (
    <StyledAddProduct>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            id="inputName"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="inputDescription">Description</label>
          <input
            type="text"
            id="inputDescription"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="inputCategory">Category</label>
          <input
            type="text"
            id="inputCategory"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="inputPrice">Price</label>
          <input
            type="number"
            id="inputPrice"
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
          />
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
    label {
      padding: 0.5em;
    }
  }
`

export default AddProduct
