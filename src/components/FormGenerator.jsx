import {useState} from "react";

export default function FormGenerator({template}){
	const [data, setData] = useState([]);

	function formSubmitHandler(e){
		e.preventDefault();
	}

	function displayAllChildInputFromBlockInput(blockInput){
		const allChildInputs = template.find((input) => input === blockInput).inputs;

		return allChildInputs.map((childInput, key) => inputRenderer(childInput, key));
	}

	function replaceSpacesWithHyphens(name){
		return name.split(' ').join('-');
	}

	function inputRenderer(input, key){
		if(input.blockInput){
			return (
				<div key={key}>
					<p className="input-label">{input.name}</p>
					{
						input.htmlInput === 'select' ? (
							<select className="form-select-input">
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
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<textarea name={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name)} required={input.required}></textarea>
					</p>
				)

			case 'checkbox':
				return (
					<p className="checkbox-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<input type="checkbox" id={replaceSpacesWithHyphens(input.name)} name={input.parent ? replaceSpacesWithHyphens(input.parent) : replaceSpacesWithHyphens(input.name)} required={input.required} />
					</p>
				)

			case 'radio':
				return (
					<p className="radio-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<input type="radio" id={replaceSpacesWithHyphens(input.name)} name={input.parent ? replaceSpacesWithHyphens(input.parent) : replaceSpacesWithHyphens(input.name)} required={input.required} />
					</p>
				)

			case 'select':
				return (
					<option key={key}>
						<p className="input-label">{input.name}</p>
					</option>
				)

			default:
				return (
					<p className="input-container" key={key}>
						<label htmlFor={replaceSpacesWithHyphens(input.name)}>{input.name}</label>
						<input type={input.htmlInput} name={replaceSpacesWithHyphens(input.name)} id={replaceSpacesWithHyphens(input.name)} required={input.required} />
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
					<button type="submit">Send form</button>
				</form>
			</div>
		</>
	)
}