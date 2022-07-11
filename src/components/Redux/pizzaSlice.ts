import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from './store'

// Another option: Record<srting, string>
type FetchPizzasArg = {
  category: string
  sortReplace: string
  descOrAsc: string
  search: string
  currentPage: string
}

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzaStatus',
  async (params: FetchPizzasArg) => {
    const { category, sortReplace, descOrAsc, search, currentPage } = params
    const { data } = await axios.get<PizzaItem[]>(
      `https://62946283a7203b3ed067de20.mockapi.io/pizzas?p=${currentPage}&l=4&${category}&sortBy=${sortReplace}&order=${descOrAsc}${search}`,
    )
    return data as PizzaItem[]
  },
)

enum Status {
  LOADING = 'loading',
  SECCESS = 'seccess',
  ERROR = 'error',
}

type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
}

interface PizzaSliceState {
  items: PizzaItem[]
  status: 'loading' | 'seccess' | 'error'
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
}

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.status = Status.SECCESS
      state.items = action.payload
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
    })
  },
})

export const selectPizzas = (state: RootState) => state.pizzas

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
