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

	function addInputInList(){
		let newInput;

		if(selectedInputType.blockInput){
			newInput = {
				name: inputName,
				htmlInput: selectedInputType.htmlInput,
				required: isInputRequired,
				blockInput: true,
				inputs: [],
			}
		} else {
			newInput = {
				name: inputName,
				htmlInput: selectedInputType.htmlInput,
				required: isInputRequired,
			}
		}

		setInputsList([
			...inputsList,
			newInput,
		])

		resetForm();
	}

	function formSubmitHandler(e){
		e.preventDefault();

		const errors = checkErrors();

		if(!errors.length){
			addInputInList();
		} else {
			setErrorsList(errors);
		}
	}

	function deleteInput(inputToDelete){
		if(inputToDelete.parent){
			const newInputList = [...inputsList];
			const currentParentInput = newInputList.find((input) => input.name === inputToDelete.parent);
			const newChildInputsList = currentParentInput.inputs.filter((input) => input !== inputToDelete);
			newInputList[newInputList.indexOf(currentParentInput)].inputs = newChildInputsList;
			setInputsList(newInputList);

		} else {
			const newInputList = inputsList.filter((input) => input !== inputToDelete);
			setInputsList(newInputList);
		}
	}

	function addDeleteInputButton(input){
		return (
			<button onClick={() => deleteInput(input)}>Supprimer</button>
		)
	}

	function displayAllChildInputFromBlockInput(blockInput){
		const allChildInputs = inputsList.find((input) => input === blockInput).inputs;

		return allChildInputs.map((childInput, key) => inputRenderer(childInput, key));
	}

	function addInputInBlockInput(blockInput, childInputType, childNameInputElement, childCheckboxIsRequiredElement){
		const currentBlockInput = inputsList.find((input) => input === blockInput);

		const newInputList = [...inputsList];
		newInputList[newInputList.indexOf(currentBlockInput)].inputs = [
			...currentBlockInput.inputs,
			{
				'parent': currentBlockInput.name,
				'name': childNameInputElement.value,
				'htmlInput': childInputType,
				'required': childCheckboxIsRequiredElement.checked,
			}
		]
		setInputsList(newInputList);

		childNameInputElement.value = "";
		childCheckboxIsRequiredElement.checked = false;
	}

	function replaceSpacesWithHyphens(name){
		return name.split(' ').join('-');
	}

	function inputRenderer(input, key){
		if(input.blockInput){
			return (
				<div key={key}>
					<div>
						<p className="input-label">{input.name}</p>
						{
							displayAllChildInputFromBlockInput(input)
						}
					</div>
					<div>
						<p className="input-container">
							<label htmlFor={`new-${replaceSpacesWithHyphens(input.name)}-name`}>Add choice in {input.name}</label>
							<input type="text" id={`new-${replaceSpacesWithHyphens(input.name)}-name`} name={`new-${replaceSpacesWithHyphens(input.name)}-name`}/>
						</p>
						<p className="checkbox-container">
							<label htmlFor={`new-${replaceSpacesWithHyphens(input.name)}-checkbox-required`}>Is required?</label>
							<input type="checkbox" name={`new-${replaceSpacesWithHyphens(input.name)}-checkbox-required`} id={`new-${replaceSpacesWithHyphens(input.name)}-checkbox-required`} />
						</p>
						<button type="button" onClick={() => addInputInBlockInput(input, input.htmlInput, document.querySelector(`#new-${replaceSpacesWithHyphens(input.name)}-name`), document.querySelector(`#new-${replaceSpacesWithHyphens(input.name)}-checkbox-required`))}>Add choice</button>
					</div>
				</div>
			)
		}

		switch (input.htmlInput){
			case 'textarea':
				return (
					<p className="input-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<textarea name={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name)} required={input.required}></textarea>
						{addDeleteInputButton(input)}
					</p>
				)

			case 'checkbox':
				return (
					<p className="checkbox-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<input type="checkbox" id={replaceSpacesWithHyphens(input.name)} name={input.parent ? replaceSpacesWithHyphens(input.parent) : replaceSpacesWithHyphens(input.name)} required={input.required} />
						{addDeleteInputButton(input)}
					</p>
				)

			default:
				return (
					<p className="input-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<input type={input.htmlInput} name={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name)} required={input.required} />
						{addDeleteInputButton(input)}
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
			<div>
				<h2>Form builder:</h2>
				<form onSubmit={formSubmitHandler} id="template-generator">
					<div id="template-generator-errors-messages-container">
						{
							errorsList.map((error, key) => (
								<p className="error-message" key={key}>The {error} field is required.</p>
							))
						}
					</div>
					<p className="input-container">
						<label htmlFor="input-name">Name:</label>
						<input onChange={nameChangeHandler} type="text" value={inputName === false ? '' : inputName} placeholder="Enter input name..." name="input-name" id="input-name" required/>
					</p>
					<p className="input-container">
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
					<p className="checkbox-container">
						<label htmlFor="checkbox-required">Is required?</label>
						<input type="checkbox" onChange={isInputRequiredHandler} checked={isInputRequired} name="checkbox-required" id="checkbox-required"/>
					</p>
					<button id="add-input-button" type="submit">Add input</button>
				</form>
			</div>
			<div id="template-preview">
				<h2>Form preview:</h2>
				{
					inputsList.map((input, key) => inputRenderer(input, key))
				}
			</div>
			<div id="template-json">
				<h2>JSON preview:</h2>
				<textarea readOnly id="json-preview-text"></textarea>
			</div>
		</>
	);
}