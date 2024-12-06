import './assets/index.css'
import AppLayout from './components/layouts/app-layout'
import MainPage from './components/layouts/main'
import { TooltipProvider } from './components/ui/tooltip'

function App(): JSX.Element {
  return (
    <TooltipProvider>
      <AppLayout>
        <MainPage />
      </AppLayout>
    </TooltipProvider>
  )
}

export default App
