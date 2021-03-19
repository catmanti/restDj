var url = 'http://127.0.0.1:8000/api/task-list/'

// Fetch a user from the GitHub API
fetch(url)
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    let wrapper = document.getElementById('list-wrapper');
    wrapper.innerHTML = `${data.map((lst) => `
    <div class="flex-wrapper">
      <div  style="flex:10" class="task-wrapper">
        ${lst.title}
      </div>
      <div  style="flex:.1">
        <button type="button" class="btn btn-info">Edit</button>
      </div>
      <div  style="flex:.5">
        <button type="button" class="btn btn-outline-dark">-</button>
      </div>
    </div>

    `).join('')} `


    console.log(data)
  })
  .catch((error) => {
    console.error(error)
  })