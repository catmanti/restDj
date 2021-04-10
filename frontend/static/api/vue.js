var tasks = JSON.parse(document.getElementById('tasks').textContent);
var task_obj = Object.create(tasks);

var app = new Vue({
  delimiters: ["[[","]]"],
  el: '#app',
  data: {
    message: task_obj,
    seen: true,
  }
})

