import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Translation from '../../../../services/multi-language';
import DiscoveryPart from '../discoveryPart';
import './discovery.scss'

function Discovery() {
  const lang = useSelector((state) => state.switchLang.lang);
  const { t, ChangeLanguage } = Translation();

  const PartContent = [
    {
      image: "/assets/images/learn-and-play.png",
      title: t('discovery.card1.title'),
      content: t('discovery.card1.content'),
    },
    {
      image: "/assets/images/support-teacher.png",
      title: t('discovery.card2.title'),
      content: t('discovery.card2.content'),
    },
    {
      image: "/assets/images/variety-exercises.png",
      title: t('discovery.card3.title'),
      content: t('discovery.card3.content'),
    },
  ]

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  return (
    <div className="discovery box" id="discovery">
      <div className="discovery__content">
        <span className="discovery__content__header">{t('discovery.title')}</span>
        <p className="discovery__content__text">
          {t('discovery.extraContent')}
        </p>
      </div>
      <div className="discovery__parts">
        <DiscoveryPart content={PartContent[0]} reverse="non-reverse" />
        <DiscoveryPart content={PartContent[2]} reverse="reverse" />
        <DiscoveryPart content={PartContent[1]} reverse="non-reverse" />
      </div>
    </div>
  )
}

export default Discovery;
