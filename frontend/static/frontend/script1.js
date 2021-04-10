// Fetch a user from the GitHub API
fetch('http://127.0.0.1:8000/api/task-list/')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let wrapper = document.getElementById('list-wrapper');
    wrapper.innerHTML =data[0].title
    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })