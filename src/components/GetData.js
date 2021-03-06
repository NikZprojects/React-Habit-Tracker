export function getData() {
  return fetch('http://localhost:8000/')
    .then(data => data.json())
}

export function setData(newData) {
  return fetch('http://localhost:8000/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //'habit': habit,
    },
    body: JSON.stringify(newData)
  })
  .then(data => data.json())
}
