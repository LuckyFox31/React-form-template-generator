import TemplateGenerator from "./components/TemplateGenerator.jsx";
import InputTypes from "./assets/InputTypes.json";

function App() {
  return (
    <div className="App">
      <header>
          <h1>React form template generator</h1>
      </header>
      <TemplateGenerator inputTypes={InputTypes} />
    </div>
  )
}

export default App
