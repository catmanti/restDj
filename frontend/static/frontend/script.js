// get csrf token as adviced by Django documantation
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
let title;
let inEditMode = false;
let id;
buildList();

function buildList() {
  var url = 'http://127.0.0.1:8000/api/task-list/'
  // Fetch a user from the GitHub API
  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let wrapper = document.getElementById('list-wrapper');
      wrapper.innerHTML = `${data.map((lst) => {
        let titleDiv = `<div  style="flex:10" id="t${lst.id}" class='title'>${lst.title}</div>`
        if (lst.completed) {
          titleDiv = `<strike  style="flex:10" id="t${lst.id}" class='title'>${lst.title}</strike>`
        }
        return `
    <div id="data-row-${lst.id}" class="flex-wrapper task-wrapper">
      ${titleDiv}
      <div  style="flex:.1">
        <button type="button" id="${lst.id}" class="btn btn-info edit">
        <i class="fas fa-list-alt"></i></button>
      </div>
      <div  style="flex:.5">
        <button type="button" id="${lst.id}" class="btn btn-outline-dark delete">
        <i class="fas fa-trash-alt"></i></button>
      </div>
    </div>
    `;
      }).join('')} `
      //  Detect the Edit button click event and assign that title to form
      var btns = document.querySelectorAll('.edit');
      for (i of btns) {
        i.addEventListener('click', function () {
          inEditMode = true;
          title = document.getElementById(`t${this.id}`).innerText;
          document.getElementById("title").value = title;
          id = this.id;
        });
      }
      let delBtns = document.querySelectorAll('.delete');
      for (i of delBtns) {
        i.addEventListener('click', function () {
          deleteItem(this.id);
        });
      }
      let title = document.querySelectorAll('.title');
      for (i of title) {
        i.addEventListener('click', function () {
          let isStriked;

          if (this.tagName == 'DIV') {
            isStriked = true;
          } else {
            isStriked = false;

          }
          strikeUnstrike(this.id.substring(1), isStriked, this.innerText)
        })
      }
      // console.log(data);
    })
    .catch((error) => {
      console.error(error);
    })
}

var form = document.getElementById("form-wrapper")
form.addEventListener('submit', function (e) {
  e.preventDefault()
  if (inEditMode) {
    if (document.getElementById("title").value != title) {
      let url = `http://127.0.0.1:8000/api/task-update/${id}/`
      taskCreate(url);
      inEditMode = false;
    }
  } else {
    let url = 'http://127.0.0.1:8000/api/task-create/'
    taskCreate(url);
  }

  function taskCreate(url) {
    let titleinput = document.getElementById("title").value
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({
        'title': titleinput
      })
    }).then(function (responce) {
      buildList();
      title = '';
      document.getElementById('form').reset()
    })
  }
})

function deleteItem(id) {
  fetch(`http://127.0.0.1:8000/api/task-delete/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  }).then((response) => {
    buildList()
  })
}

function strikeUnstrike(id, isCompleted, thistitle) {
  fetch(`http://127.0.0.1:8000/api/task-update/${id}/`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({ 'title': thistitle, 'completed': isCompleted })
  }).then((response) => {
    buildList()
  })
}