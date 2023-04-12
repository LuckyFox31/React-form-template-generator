import TemplateGenerator from "./components/TemplateGenerator.jsx";
import InputTypes from "./assets/InputTypes.json";
import FormGenerator from "./components/FormGenerator.jsx";
import DemoJsonFile from "./assets/DemoJsonFile.json";

function App() {
  return (
    <div className="App">
      <header>
          <h1>React form template generator</h1>
      </header>
      <main>
          <TemplateGenerator inputTypes={InputTypes} />
          <hr />
          <FormGenerator template={DemoJsonFile} />
      </main>
    </div>
  )
}

export default App
