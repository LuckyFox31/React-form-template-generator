export default function TemplateGenerator(){
	return (
		<>
			<form id="template-generator">
				<p>
					<label htmlFor="input-name">Name:</label>
					<input type="text" placeholder="Enter input name..." name="input-name" id="input-name"/>
				</p>
				<p>
					<label htmlFor="select-type">Type:</label>
					<select defaultValue="none" name="select-type" id="select-type">
						<option value="none" disabled>-- Choose input type --</option>
					</select>
				</p>
				<button type="button">Add input</button>
			</form>
			<div id="template-preview"></div>
		</>
	);
}