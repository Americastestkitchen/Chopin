function createLi(inner) {
  const li = document.createElement("li");
  li.innerHTML = inner;
  return li;
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let mdc = params.mdc; // "some_value"
let incode = params.incode;
const ul = document.querySelector("ul");
const mdcLi = createLi(`MDC: ${mdc}`);
const incodeLi = createLi(`Incode: ${incode}`);
ul.appendChild(mdcLi);
ul.appendChild(incodeLi);
