import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = () => (
  <div className="pizza-block-wrapper">
    <ContentLoader
      className="pizza-block"
      speed={0}
      width={280}
      height={465}
      viewBox="0 0 280 465"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="230" rx="5" ry="5" width="280" height="28" />
      <circle cx="136" cy="105" r="105" />
      <rect x="0" y="285" rx="6" ry="6" width="280" height="75" />
      <rect x="0" y="393" rx="6" ry="6" width="91" height="35" />
      <rect x="130" y="388" rx="20" ry="20" width="150" height="45" />
    </ContentLoader>
  </div>
)

export default Skeleton
