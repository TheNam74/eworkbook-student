import React from "react"
import './discoveryCard.scss'

function DiscoveryCard(props) {
  const { config } = props;
  return (
    <div className="discovery-card">
      <img src={config.image} alt="discovery" />
      <span className="discovery-card__title">
        {config.title}
      </span>
      <p className="discovery-card__content">
        {config.content}
      </p>
    </div>
  )
}

export default DiscoveryCard;
