import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Dropdown, Menu } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import Translation from '../../../../services/multi-language'
import './navLink.scss'

function NavLink() {
  // eslint-disable-next-line arrow-parens
  const lang = useSelector(state => state.switchLang.lang)
  const { t, ChangeLanguage } = Translation()
  const location = useLocation()
  const key = location.pathname.split('/')[1]

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  const menu = [
    {
      key: 'library',
      title: t('header.library'),
      to: '/library',
    },
    {
      key: 'history',
      title: t('header.history'),
      to: "/history/currentuser",
    },
    {
      key: 'assignments',
      title: t('header.assignment'),
      to: "/assignments/currentuser",
    },
  ]
  return (
    <>
      <div className="navbar__link-container">
        {menu.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            className={classNames(
              'navbar__link tw-ml-10 tw-h-full tw-inline-block',
              {
                'navbar__link--active': key === item.key,
              },
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="burger--menu tw-ml-5 tw-mr-5">
        <Dropdown
          overlayClassName="navbar__dropdown"
          overlay={(
            <Menu
              items={
                menu.map((item) => ({
                  key: item.key,
                  label: <Link to={item.to}>{item.title}</Link>,
                }))
              }
            />
          )}
          trigger={['click']}
        >
          <MenuOutlined />
        </Dropdown>
      </div>
    </>
  )
}

export default NavLink
