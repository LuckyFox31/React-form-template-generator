import {useState} from "react";

export default function TemplateGenerator({inputTypes}){
	const [inputsList, setInputsList] = useState([]);
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
		setInputName(false);
		setSelectedInputType(false);
	}

	function formSubmitHandler(e){
		e.preventDefault();

		if(inputName && selectedInputType){
			const newInput = {
				name: inputName,
				htmlInput: selectedInputType.htmlInput,
			}

			setInputsList([
				...inputsList,
				newInput,
			])

			resetForm();
		}
	}

	return (
		<>
			<form onSubmit={formSubmitHandler} id="template-generator">
				<p>
					<label htmlFor="input-name">Name:</label>
					<input onChange={nameChangeHandler} type="text" value={inputName === false ? '' : inputName} placeholder="Enter input name..." name="input-name" id="input-name"/>
				</p>
				<p>
					<label htmlFor="select-type">Type:</label>
					<select onChange={selectedInputTypeChangeHandler} defaultValue="none" name="select-type" id="select-type">
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