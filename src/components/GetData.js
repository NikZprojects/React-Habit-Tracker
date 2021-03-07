export function getData() {
  return fetch("http://localhost:8000/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  }).then((data) => data.json());
}

export function setData(newData) {
  return fetch("http://localhost:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    body: JSON.stringify(newData),
  }).then((data) => data.json());
}
