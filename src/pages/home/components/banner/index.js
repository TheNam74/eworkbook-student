/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from 'antd'
import { useSelector } from 'react-redux'
import MobileStoreButton from 'react-mobile-store-button/lib/MobileStoreButton'
import Translation from '../../../../services/multi-language'
import DemoButton from '../../../../components/demoButton'
import './banner.scss'

function Banner({ isSignIn }) {
  const lang = useSelector((state) => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  const navigate = useNavigate()
  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  return (
    <div className="banner box">
      <div className="banner__left">
        <div className="banner__left__text">
          <span className="banner__left__text--upper">{t('banner.title')}</span>
          <p className="banner__left__text--below">
            {t('banner.content1')}
            <span className="banner__left__text--empha">
              {' '}
              {t('banner.content2')}
              {' '}
            </span>
            {t('banner.content3')}
            <span className="banner__left__text--empha">
              {' '}
              {t('banner.content4')}
              {' '}
            </span>
          </p>
          <span className="banner__left__text--extra">
            {t('banner.statement')}
          </span>
        </div>
        <div className="banner__left__buttons">
          <a href="#inform">
            <Button className="banner__left__buttons__button bg-second-primary !tw-ml-0">{t('banner.contactButton')}</Button>
          </a>
          {
            isSignIn ? (
              <Link to="/library">
                <Button className="banner__left__buttons__button bg-primary">{t('banner.libraryButton')}</Button>
              </Link>
            ) : (
              <Link to="/signin">
                <Button className="banner__left__buttons__button bg-primary">{t('banner.learnButton')}</Button>
              </Link>
            )
          }
        </div>
        <div className="tw-w-[100%]">
          <MobileStoreButton
            store="ios"
            className="tw-relative tw-bottom-[-12px] tw-mr-2"
            width={170}
            // onClick={() => notification.info({
            //   message: 'Coming soon',
            //   placement: 'topLeft',
            //   style: {
            //     marginTop: 60,
            //   },
            //   duration: 2,
            // })}
            url="https://apps.apple.com/us/app/eworkbook/id1672050076"
          />
          <MobileStoreButton
            store="android"
            url="https://play.google.com/store/apps/details?id=com.hatieudao.eworkbook&hl=en&gl=US"
            className=""
            width={200}
          />
        </div>
        {/* <div
          className="tw-flex tw-items-center tw-cursor-pointer"
          onClick={() => navigate('/demo')}
        >
          <div className="tw-flex tw-items-center tw-w-2/3">
            <p className="tw-text-3xl tw-text-primary tw-m-0 tw-underline">
              {t('banner.demoButton')}
            </p>
          </div>
          <DemoButton />
        </div> */}
      </div>
      <div className="banner__right">
        {/* <img src="assets/images/top-banner3.png" alt="student" /> */}
        <div className="banner__right__video">
          <iframe frameBorder="0" title="video-demo" height="250" width="100%" src="https://www.youtube.com/embed/eImwXX25DpE" />
        </div>
        <div
          className="tw-flex tw-items-center tw-cursor-pointer tw-mt-10 tw-cursor-pointer banner__right__demo"
          onClick={() => navigate('/demo')}
        >
          <div className="tw-flex tw-items-center tw-w-2/3">
            <p className="tw-text-3xl xs:tw-text-base tw-text-white !tw-m-0">
              {t('banner.demoButton')}
            </p>
          </div>
          <DemoButton />
        </div>
      </div>
    </div>
  )
}

export default Banner
