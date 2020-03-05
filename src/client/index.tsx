import React from 'react'
import { hydrate } from 'react-dom'
import App from '../shared/App'

declare global {
  interface Window { __INITIAL_DATA__: any; }
}

window.__INITIAL_DATA__ = window.__INITIAL_DATA__ || {};

hydrate(
  <App data={window.__INITIAL_DATA__} />,
  document.getElementById('app')
);