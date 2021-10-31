const { it } = require("test.it");
const React = require("react");
const { render, unmountComponentAtNode } = require("react-dom");
const { act } = require("react-dom/test-utils");


const App =(props)=> {
	return(<div>{props.name}</div>)
}

let container = null;
window.beforeEach =()=> {
	container = document.createElement("div");
	document.body.appendChild(container);
}

window.afterEach =()=> {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
}


it("renders with or without a name", ()=> {
	act(()=> {
		render(<App />, container);
	});
	expect(container.textContent).toBe("Hey, stranger");

	act(()=> {
		render(<App name="Jenny" />, container);
	});
	expect(container.textContent).toBe("Hello, Jenny!");

	act(()=> {
		render(<App name="Margaret" />, container);
	});
	expect(container.textContent).toBe("Hello, Margaret!");
});