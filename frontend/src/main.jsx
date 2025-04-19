import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"

import {Toaster} from "react-hot-toast"
import { persistor, store } from './store/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Loader } from './components/Loader.jsx'



createRoot(document.getElementById('root')).render(
  

  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loader/>}>
      <Toaster/>
      <BrowserRouter>
         <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>


)
