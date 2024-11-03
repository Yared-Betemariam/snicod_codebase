import './assets/index.css'
import AppLayout from './components/layouts/app-layout'
import MainPage from './components/layouts/main'

function App(): JSX.Element {
  return (
    <AppLayout>
      <MainPage />
    </AppLayout>
  )
}

export default App
