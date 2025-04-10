import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './App.tsx'
import { persistor, store } from './store/store.ts'
import { PersistGate } from 'redux-persist/lib/integration/react'
import LoadingDots from './components/common/Loading.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<LoadingDots></LoadingDots>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
)
