// Helper function 

export function decodeHTMLEntities(text) {
     const element = document.createElement("div");
     element.innerHTML = text;
     return element.textContent || element.innerText;
}

