import { useState } from 'react'
import './App.css'
import { Cards } from './components/Card/Cards'
import { FormTask } from './components/Form/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App container">
      <div className="row">
        <h1 className="mt-2 title-app ">Gestor de Tareas</h1>
      </div>

      <div className="container App-header">
        <hr className="hr" />
        <FormTask />
      </div>
    </div>
  )
}

export default App
