import './App.css'
import { Counter } from './components'

function App() {
  return (
    <div>
      <h1>Counter Component:</h1>
      <h5>Initializing the state using properties</h5>
      <Counter initialCount={1} />
    </div>
  )
}

export default App
