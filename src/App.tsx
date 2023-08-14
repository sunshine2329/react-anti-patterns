import './App.css'
import { Counter, List } from './components'

function App() {
  return (
    <div>
      <h1>Counter Component:</h1>
      <h5>Initializing the state using properties</h5>
      <Counter initialCount={1} />

      <h1>List Component:</h1>
      <h5>Using indexes as a key</h5>
      <List />
    </div>
  )
}

export default App
