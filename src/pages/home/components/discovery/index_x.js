import React, { useEffect } from 'react'
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import DiscoveryCard from '../discoveryCard';
import Translation from '../../../../services/multi-language';

import './discovery.scss'

function Discovery() {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  const CardContent = [
    {
      image: "/assets/images/d.png",
      title: t('discovery.card1.title'),
      content: t('discovery.card1.content'),
    },
    {
      image: "/assets/images/d2.png",
      title: t('discovery.card1.title'),
      content: t('discovery.card1.content'),
    },
    {
      image: "/assets/images/d3.png",
      title: t('discovery.card1.title'),
      content: t('discovery.card1.content'),
    },
    {
      image: "/assets/images/d4.png",
      title: t('discovery.card1.title'),
      content: t('discovery.card1.content'),
    },
  ]

  return (
    <div className="discovery">
      <div className="discovery__content">
        <span className="discovery__content__header text-3xl font-bold underline">{t('discovery.title')}</span>
        <Row className="discovery__content__card">
          <Col xs={24} md={12} lg={6}>
            <DiscoveryCard config={CardContent[0]} />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <DiscoveryCard config={CardContent[1]} />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <DiscoveryCard config={CardContent[2]} />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <DiscoveryCard config={CardContent[3]} />
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Discovery;
