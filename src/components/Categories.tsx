import React from 'react'

type CategoriesProps = {
  value: number
  onClickCategories: (index: number) => void
}

const Categories: React.FC<CategoriesProps> = ({
  value,
  onClickCategories,
}) => {
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ]

  const renderCategories = categories.map((item, index) => {
    return (
      <li
        onClick={() => onClickCategories(index)}
        key={index}
        className={value === index ? 'active' : ''}
      >
        {item}
      </li>
    )
  })

  return (
    <div className="categories">
      <ul>{renderCategories}</ul>
    </div>
  )
}
export default Categories
