import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { selectPizzas } from '../components/Redux/pizzaSlice'
import { RootState, useAppDispatch } from '../components/Redux/store'
import {
  setPizzaCategories,
  setCurrentPage,
  selectFilter,
} from '../components/Redux/filterSlice'

import { fetchPizzas } from '../components/Redux/pizzaSlice'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/PizzaSkeleton'
import Pagination from '../components/Pagination'

const Home: React.FC = () => {
  const { items, status } = useSelector(selectPizzas)
  const inputValue = useSelector((state: RootState) => state.filter.inputValue)

  const dispatch = useAppDispatch()
  const { pizzaCategories, sort, currentPage } = useSelector(selectFilter)

  const onClickCategories = (id: number) => {
    dispatch(setPizzaCategories(id))
  }

  const onChangeCurrentPage = (number: number) => {
    dispatch(setCurrentPage(number))
  }

  const getPizzas = () => {
    const category = pizzaCategories > 0 ? `category=${pizzaCategories}` : ''
    const sortReplace = sort.sort.replace('-', '')
    const descOrAsc = sort.sort.indexOf('-', 0) > -1 ? 'asc' : 'desc'
    const search = inputValue ? `&search=${inputValue}` : ''

    dispatch(
      fetchPizzas({
        category,
        sortReplace,
        descOrAsc,
        search,
        currentPage: String(currentPage),
      }),
    )

    window.scrollTo(0, 0)
  }

  useEffect(() => {
    getPizzas()
  }, [pizzaCategories, sort, inputValue, currentPage])

  const pizzasRender =
    status === 'error' ? (
      <div className="content__error">
        <p>Не удалось получить пиццы, попробуйте еще раз! 😕</p>
      </div>
    ) : status === 'loading' ? (
      [...new Array(6)].map((_, index) => {
        return <Skeleton key={index} />
      })
    ) : (
      items.map((obj: any) => {
        return <PizzaBlock key={obj.id} {...obj} />
      })
    )

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={pizzaCategories}
          onClickCategories={onClickCategories}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{pizzasRender}</div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={onChangeCurrentPage}
      />
    </div>
  )
}
export default Home
