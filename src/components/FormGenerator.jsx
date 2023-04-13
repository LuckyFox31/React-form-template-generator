import {useState, useEffect} from "react";

export default function FormGenerator({template}){
	const [data, setData] = useState([]);

	useEffect(() => {
		const jsonPreviewData = document.querySelector("#json-preview-data");
		jsonPreviewData.value = JSON.stringify(data);
	}, [data])

	function formSubmitHandler(e){
		e.preventDefault();
	}

	function inputChangeHandler(event){
		const name = event.target.name.split('_')[0];

		const index = data.findIndex((data) => {
			return data.name === name
		});

		if(index !== -1){
			const newDataArray = [...data];
			newDataArray[index] = {
				name: name,
				value: event.target.value
			}
			setData(newDataArray);
		} else{
			setData([
				...data,
				{
					name: name,
					value: event.target.value
				}
			])
		}
	}

	function generateRandomStringId(){
		return Math.random().toString(36).substring(2,7);
	}

	function displayAllChildInputFromBlockInput(blockInput){
		const allChildInputs = template.find((input) => input === blockInput).inputs;

		return allChildInputs.map((childInput, key) => inputRenderer(childInput, key));
	}

	function replaceSpacesWithHyphens(name){
		return name.split(' ').join('-');
	}

	function inputRenderer(input, key){
		const randomId = generateRandomStringId();

		if(input.blockInput){
			return (
				<div key={key}>
					<p className="input-label">{input.name}</p>
					{
						input.htmlInput === 'select' ? (
							<select className="form-select-generator-input" name={replaceSpacesWithHyphens(input.name) + '_' + randomId} onChange={inputChangeHandler} defaultValue="">
								<option value="" disabled hidden>
									-- Select option ---
								</option>
								{displayAllChildInputFromBlockInput(input)}
							</select>
						) : displayAllChildInputFromBlockInput(input)
					}
				</div>
			)
		}

		switch (input.htmlInput){
			case 'textarea':
				return (
					<p className="input-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name) + '_' + randomId}>{input.name}</label>
						<textarea name={replaceSpacesWithHyphens(input.name) + '_' + randomId} id={replaceSpacesWithHyphens(input.name) + '_' + randomId} required={input.required} onChange={inputChangeHandler}></textarea>
					</p>
				)

			case 'checkbox':
				return (
					<p className="checkbox-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name) + '_' + randomId}>{input.name}</label>
						<input type="checkbox" value={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name) + '_' + randomId} name={input.parent ? replaceSpacesWithHyphens(input.parent) : replaceSpacesWithHyphens(input.name) + '_' + randomId} required={input.required} onChange={inputChangeHandler} />
					</p>
				)

			case 'radio':
				return (
					<p className="radio-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name) + '_' + randomId}>{input.name}</label>
						<input type="radio" value={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name) + '_' + randomId} name={input.parent ? replaceSpacesWithHyphens(input.parent) : replaceSpacesWithHyphens(input.name) + '_' + randomId} required={input.required} onChange={inputChangeHandler} />
					</p>
				)

			case 'select':
				return (
					<option key={key} value={input.value}>
						{input.name}
					</option>
				)

			default:
				return (
					<p className="input-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name) + '_' + randomId}>{input.name}</label>
						<input type={input.htmlInput} name={replaceSpacesWithHyphens(input.name) + '_' + randomId} id={replaceSpacesWithHyphens(input.name) + '_' + randomId} required={input.required} onChange={inputChangeHandler} />
					</p>
				)
		}
	}

	return (
		<>
			<div>
				<h2>Final form :</h2>
				<form onSubmit={formSubmitHandler} id="form-generator">
					{
						template.map((input, key) => inputRenderer(input, key))
					}
					<button id="submit-form-button" type="submit">Send form</button>
				</form>
			</div>
			<div id="data-json">
				<h2>JSON data:</h2>
				<textarea readOnly id="json-preview-data"></textarea>
			</div>
		</>
	)
}