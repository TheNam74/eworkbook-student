import React from 'react'

function SwitchLangNav(props) {
  const { onChangeLanguage } = props;

  return (
    <nav style={{ width: '100%', padding: '2rem 0', backgroundColor: 'gray' }}>
      <button type="button" onClick={() => onChangeLanguage('en')}>
        english
      </button>
      <button type="button" onClick={() => onChangeLanguage('vi')}>
        vietnamese
      </button>
    </nav>
  )
}

export default SwitchLangNav
