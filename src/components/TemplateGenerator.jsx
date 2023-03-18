import {useState} from "react";

export default function TemplateGenerator({inputTypes}){
	const [inputsList, setInputsList] = useState([]);
	const [errorsList, setErrorsList] = useState([]);
	const [inputName, setInputName] = useState(false);
	const [selectedInputType, setSelectedInputType] = useState(false);

	function nameChangeHandler(e){
		setInputName(e.target.value);
	}

	function selectedInputTypeChangeHandler(e){
		const inputType = inputTypes.find(input => input.name === e.target.value);
		setSelectedInputType(inputType);
	}

	function resetForm(){
		setErrorsList([]);
		setInputName(false);
	}

	function checkErrors(){
		const errorList = [];

		!inputName && errorList.push('name');
		!selectedInputType && errorList.push('type');

		return errorList;
	}

	function formSubmitHandler(e){
		e.preventDefault();

		const errors = checkErrors();

		if(!errors.length){
			const newInput = {
				name: inputName,
				htmlInput: selectedInputType.htmlInput,
			}

			setInputsList([
				...inputsList,
				newInput,
			])

			resetForm();
		} else {
			setErrorsList(errors);
		}
	}

	return (
		<>
			<form onSubmit={formSubmitHandler} id="template-generator">
				<div id="template-generator-errors-messages-container">
					{
						errorsList.map((error, key) => (
							<p className="error-message" key={key}>The {error} field is required.</p>
						))
					}
				</div>
				<p>
					<label htmlFor="input-name">Name:</label>
					<input onChange={nameChangeHandler} type="text" value={inputName === false ? '' : inputName} placeholder="Enter input name..." name="input-name" id="input-name" required/>
				</p>
				<p>
					<label htmlFor="select-type">Type:</label>
					<select onChange={selectedInputTypeChangeHandler} defaultValue="none" name="select-type" id="select-type" required>
						<option value="none" disabled>-- Choose input type --</option>
						{
							inputTypes.map((input, key) => (
								<option key={key}>{input.name}</option>
							))
						}
					</select>
				</p>
				<button type="submit">Add input</button>
			</form>
			<div id="template-preview"></div>
		</>
	);
}