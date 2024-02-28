import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/css/antd.css'
import './styles/style.css'
import './index.scss'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './services/multi-language/i18n'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
