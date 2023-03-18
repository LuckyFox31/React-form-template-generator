import TemplateGenerator from "./components/TemplateGenerator.jsx";
import InputTypes from "./assets/InputTypes.json";

function App() {
  return (
    <div className="App">
      <header>
          <h1>React form template generator</h1>
      </header>
      <main>
          <TemplateGenerator inputTypes={InputTypes} />
      </main>
    </div>
  )
}

export default App
