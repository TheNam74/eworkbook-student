import { createSlice } from "@reduxjs/toolkit"

const switchLangInitialState = {
  lang: ['en', 'vi'].includes(localStorage.getItem('lang'))
    ? localStorage.getItem('lang') : 'vi',
}

const switchLangSlice = createSlice({
  name: 'switchLanguage',
  initialState: switchLangInitialState,
  reducers: {
    switch(state) {
      if (state.lang === 'en') {
        state.lang = 'vi'
        localStorage.setItem('lang', 'vi')
      } else {
        state.lang = 'en'
        localStorage.setItem('lang', 'en')
      }
    },
    toEnglish(state) {
      state.lang = 'en'
      localStorage.setItem('lang', 'en')
    },
  },
})
export const switchLangActions = switchLangSlice.actions
export default switchLangSlice.reducer
