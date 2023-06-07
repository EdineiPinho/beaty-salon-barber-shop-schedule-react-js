import { BrowserRouter } from 'react-router-dom'
import './global.css'
import { RouteApp } from './routes/index.tsx'

function App() {

  return (
    <BrowserRouter>
      <RouteApp />
    </BrowserRouter>
  )
}

export default App
