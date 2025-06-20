import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import { store } from './store/store'
import { Provider } from 'react-redux'

import './styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { JournalApp } from './JournalApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
        <BrowserRouter>
            <JournalApp/>
        </BrowserRouter>
    </Provider>
  </StrictMode>,
)
