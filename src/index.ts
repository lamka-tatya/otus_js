const greeter = (person: string): string => "Hello from TypeScript, " + person;

const user = "Otus"
const element = document.createElement("div");
element.innerHTML = greeter(user);

document.body.appendChild(element);
