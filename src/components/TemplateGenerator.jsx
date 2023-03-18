import {useEffect, useState} from "react";

export default function TemplateGenerator({inputTypes}){
	const [inputsList, setInputsList] = useState([]);
	const [errorsList, setErrorsList] = useState([]);
	const [inputName, setInputName] = useState(false);
	const [selectedInputType, setSelectedInputType] = useState(false);
	const [isInputRequired, setIsInputRequired] = useState(false);

	function nameChangeHandler(e){
		setInputName(e.target.value);
	}

	function selectedInputTypeChangeHandler(e){
		const inputType = inputTypes.find(input => input.name === e.target.value);
		setSelectedInputType(inputType);
	}

	function isInputRequiredHandler(e){
		setIsInputRequired(e.target.checked);
	}

	function resetForm(){
		setErrorsList([]);
		setInputName(false);
		setIsInputRequired(false);
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
				required: isInputRequired,
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

	function inputRenderer(input, key){
		switch (input.htmlInput){
			case 'textarea':
				return (
					<p key={key}>
						<label htmlFor={input.name}>{input.name}</label>
						<textarea name={input.name} id={input.name} required={input.required}></textarea>
					</p>
				)

			default:
				return (
					<p key={key}>
						<label htmlFor={input.name}>{input.name}</label>
						<input type={input.htmlInput} name={input.name} id={input.name} required={input.required} />
					</p>
				)
		}
	}

	useEffect(() => {
		const jsonPreviewText = document.querySelector("#json-preview-text");
		jsonPreviewText.value = JSON.stringify(inputsList);
	}, [inputsList])

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
				<p>
					<label htmlFor="checkbox-required">Is required?</label>
					<input type="checkbox" onChange={isInputRequiredHandler} checked={isInputRequired} name="checkbox-required" id="checkbox-required"/>
				</p>
				<button type="submit">Add input</button>
			</form>
			<div id="template-preview">
				{
					inputsList.map((input, key) => inputRenderer(input, key))
				}
			</div>
			<div id="template-json">
				<textarea readOnly id="json-preview-text"></textarea>
			</div>
		</>
	);
}