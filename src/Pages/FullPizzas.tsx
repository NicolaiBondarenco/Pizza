import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const FullPizzas: React.FC = () => {
  const [pizza, setPizza] = useState<{
    title: string
    imageUrl: string
    price: number
  }>()
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          'https://62946283a7203b3ed067de20.mockapi.io/pizzas/' + id,
        )
        setPizza(data)
      } catch (error) {
        alert(
          'Ошибка при получении пиццы! Нажмите "ОК", что бы перейти на главную страницу!',
        )
        navigate('/')
      }
    }
    getPizza()
  }, [])

  if (!pizza) {
    return <p>Загрузка...</p>
  }

  return (
    <div className="container">
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt="Pizza" />
      <p>{pizza.price} ₽</p>
    </div>
  )
}
export default FullPizzas
