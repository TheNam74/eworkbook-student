/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Input, Avatar, Menu, Button, Dropdown, Drawer,
} from 'antd'
import {
  UserOutlined, MenuOutlined, ExportOutlined, UsergroupAddOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { switchLangActions } from '../../../../store/slice/switchLangSlice'
import Translation from '../../../../services/multi-language'
import authApi from '../../../../api/authApi'
import './navContent.scss'

const { Search } = Input

function NavContent(props) {
  const location = useLocation()
  const lang = useSelector((state) => state.switchLang.lang)
  const user = useSelector((state) => state.auth.login.currentUser)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const flagImage = `/assets/images/lang-${lang}.jpg`
  const clickHandler = () => {
    dispatch(switchLangActions.switch())
  }

  const { t, ChangeLanguage } = Translation()

  useEffect(() => {
    ChangeLanguage(lang)
  }, [lang])

  const { isOpen } = props
  const [visible, setVisible] = useState(false)

  const onBurgerMenuClick = () => {
    setVisible((prev) => !prev)
  }

  const onClose = () => {
    setVisible(false)
  }

  // const handleLogOut = () => {
  //   authApi.logOut(dispatch, navigate)
  //   setIsOpen(false)
  // }
  function drawerClickHandler(e) {
    const { classList } = e.target
    if (classList.contains('navbar__link')) {
      setVisible(false)
    }
  }

  const menu = (
    <Menu
      items={[
        {
          /* header - profile */
          icon: <UserOutlined />,
          label: <Link to="/profile">{t('header.profile')}</Link>,
          key: '0',
        },
        {
          icon: <UsergroupAddOutlined />,
          label: <Link to="/pair">{t('header.pair')}</Link>,
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          /* header - signout */
          icon: <ExportOutlined />,
          label: t('header.signout'),
          danger: true,
          onClick: async () => {
            try {
              await authApi.logOut(dispatch, navigate)
            } catch (error) {
              // console.log(error)
            }
          },
          key: '3',
        },
      ]}
    />
  )

  return isOpen ? (
    <div className="right--content">
      {location.pathname.split('/')[1] !== "library" && (
        <Search
          placeholder={t('header.searchMaterial')}
          className="navbar__search rounded-lg"
          onSearch={(value) => {
            if (value !== '') {
              navigate(`/library?name=${value}`)
            }
          }}
          allowClear
        />
      )}
      <img onClick={clickHandler} src={flagImage} alt={lang} className="language--selector tw-cursor-pointer" />
      <Dropdown
        overlayClassName="navbar__dropdown"
        overlay={menu}
        trigger={['click']}
      >
        <Avatar className="navbar__avatar" src={`${process.env.REACT_APP_API_URL}/users/images/${user.avatar}`} />
      </Dropdown>
    </div>
  ) : (
    <div className="right--content">
      <img onClick={clickHandler} src={flagImage} alt={lang} className="language--selector tw-cursor-pointer" />
      <Link to="/signin" className="anon--link">
        <Button className="navbar__button btn--dark">
          {/* header - signin */}
          {t('header.signin')}
        </Button>
      </Link>
      <Link to="/signup" className="anon--link">
        <Button className="navbar__button btn--light" style={{ margin: "0" }}>
          {/* header - signup */}
          {t('header.signup')}
        </Button>
      </Link>
      <MenuOutlined onClick={onBurgerMenuClick} className="burger--menu" />
      <Drawer
        zIndex={1000000000001}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={drawerClickHandler}
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Link className="navbar__link primary--block" to="signin">
          {/* header - signin */}
          {t('header.signin')}
        </Link>
        <Link className="navbar__link primary--block" to="signup">
          {/* header - signup */}
          {t('header.signup')}
        </Link>
      </Drawer>
    </div>
  )
}

export default NavContent
