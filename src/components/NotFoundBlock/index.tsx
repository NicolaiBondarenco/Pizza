import React from 'react'

import styles from './NotFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h2>Страница не найдена...</h2>
      <span>😕</span>
      <p>Попробуйте еще раз!</p>
    </div>
  )
}
export default NotFoundBlock
