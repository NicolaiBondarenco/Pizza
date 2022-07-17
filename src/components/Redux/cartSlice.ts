import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type CartItem = {
  id: string
  title: string
  size: string
  imageUrl: string
  count: number
  price: number
  type: number
}

interface CartSliceState {
  totalPrice: number
  items: CartItem[]
  open: boolean
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
  open: false,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (action.payload.size === 'традиционное') {
        action.payload.price += 30
      }
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        })
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum
      }, 0)
    },
    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        findItem.count--
      }
      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.price
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)
    },
    clearItem(state) {
      state.items = []
      state.totalPrice = 0
    },
    togglePopup(state, action) {
      state.open = action.payload
    },
    // addAnotherItem(state, action) {
    //   const findObj = state.items.find(
    //     (obj) => obj.size === action.payload.size,
    //   )
    //   if (action.payload.size === 'традиционное') {
    //     action.payload.price += 30
    //   }
    //   if (findObj) {
    //     findObj.count++
    //   } else {
    //     state.items.push({
    //       ...action.payload,
    //       count: 1,
    //     })
    //   }
    // },
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id)

export const {
  addItem,
  removeItem,
  minusItem,
  clearItem,
  togglePopup,
  // addAnotherItem,
} = cartSlice.actions

export default cartSlice.reducer
