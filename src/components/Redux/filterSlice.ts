import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'

export type SortFilterSliceState = {
  name: string
  sort: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title'
}

interface FilterSliceState {
  inputValue: string
  pizzaCategories: number
  sort: SortFilterSliceState
  currentPage: number
}

const initialState: FilterSliceState = {
  inputValue: '',
  pizzaCategories: 0,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
  currentPage: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setPizzaCategories(state, action: PayloadAction<number>) {
      state.pizzaCategories = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload
    },
    setSort(state, action: PayloadAction<SortFilterSliceState>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
})

export const selectFilter = (state: RootState) => state.filter
export const selectFilterSort = (state: RootState) => state.filter.sort

export const {
  setPizzaCategories,
  setSort,
  setCurrentPage,
  setSearchValue,
} = filterSlice.actions

export default filterSlice.reducer
