import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { addItem, CartItem, selectCartById } from '../Redux/cartSlice'

const typeName = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartById(id))
  const addedCount = cartItem ? cartItem.count : '0'

  const [activeType, setActiveType] = useState(0)
  const [toggleSize, setToggleSize] = useState(26)
  const [activeSize, setActiveSize] = useState(0)

  const ChangeType = (type: number) => {
    setActiveType(type)
  }

  const addItemCart = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      size: typeName[activeType],
      type: toggleSize,
      count: 0,
    }
    dispatch(addItem(item))
  }

  const ChangeToggleActive = (size: number, index: number) => {
    setActiveSize(index)
    setToggleSize(size)
  }

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <Link to={`/pizzas/${id}`}>
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type) => {
              return (
                <li
                  key={type}
                  onClick={() => ChangeType(type)}
                  className={activeType === type ? 'active' : ''}
                >
                  {typeName[type]}
                </li>
              )
            })}
          </ul>
          <ul>
            {sizes.map((size, index) => {
              return (
                <li
                  key={index}
                  onClick={() => ChangeToggleActive(size, index)}
                  className={activeSize === index ? 'active' : ''}
                >
                  {size} см.
                </li>
              )
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">
            от {activeType === 1 ? price + 30 : price} ₽
          </div>
          <button
            onClick={addItemCart}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {cartItem && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}
export default PizzaBlock
