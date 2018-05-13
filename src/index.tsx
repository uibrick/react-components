import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/app'

import store from './store'

render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
)