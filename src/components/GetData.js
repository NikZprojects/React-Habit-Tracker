export function getData() {
  return fetch('http://localhost:8000/')
    .then(data => data.json())
}

export function setData(habit) {
  return fetch('http://localhost:8000/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //'habit': habit,
    },
    body: JSON.stringify(habit)
  })
  .then(data => data.json())
}
