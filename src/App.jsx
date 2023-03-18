import TemplateGenerator from "./components/TemplateGenerator.jsx";
import InputTypes from "./assets/InputTypes.json";

function App() {
  return (
    <div className="App">
      <TemplateGenerator inputTypes={InputTypes} />
    </div>
  )
}

export default App
