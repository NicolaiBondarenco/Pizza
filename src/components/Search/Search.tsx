import React, { useState, useRef, useCallback } from 'react'

import debounce from 'lodash.debounce'

import { setSearchValue, selectFilter } from '../Redux/filterSlice'

import styles from './search.module.scss'
import icon from './2784260_business_finance_magnifier_money_search_icon.png'
import { useDispatch, useSelector } from 'react-redux'

const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [colorSvg, setColorSvg] = useState('black')
  const inputRef = useRef<HTMLInputElement>(null)
  const { inputValue } = useSelector(selectFilter)

  const testDebounce = useCallback(
    debounce((value) => {
      setSearchValue(value)
    }, 300),
    [],
  )

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    inputRef.current?.focus()
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value))
    testDebounce(e.target.value)
  }

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={icon} alt="Search" />
      <input
        ref={inputRef}
        value={inputValue}
        className={styles.input}
        onChange={onChangeValue}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {inputValue && (
        <svg
          onMouseOver={() => setColorSvg('red')}
          onMouseOut={() => setColorSvg('black')}
          onClick={onClickClear}
          data-name="Livello 1"
          id="Livello_1"
          viewBox="0 0 128 128"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title />
          <path
            fill={colorSvg}
            d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"
          />
          <path
            fill={colorSvg}
            d="M92.12,35.79a3,3,0,0,0-4.24,0L64,59.75l-23.87-24A3,3,0,0,0,35.88,40L59.76,64,35.88,88a3,3,0,0,0,4.25,4.24L64,68.25l23.88,24A3,3,0,0,0,92.13,88L68.24,64,92.13,40A3,3,0,0,0,92.12,35.79Z"
          />
        </svg>
      )}
    </div>
  )
}
export default Search
