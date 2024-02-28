import React from 'react';
import './discoveryPart.scss'

function DiscoveryPart({ content, reverse }) {
  const classes = `container  ${reverse}`;
  return (
    <div className={classes}>
      <div className="image">
        <img src={content.image} alt="discovery" />
      </div>
      <div className="content">
        <span className="content__header">
          {content.title}
        </span>
        <p className="content__text">
          {content.content}
        </p>
      </div>
    </div>
  )
}

export default DiscoveryPart;
