var app4 = new Vue({
    el: '#app',
    delimiters: ['((', '))'],
    data() {
        return {
            data: {}
        }
    },
    beforeMount(){
        this.getName();
    },
    methods: {
    async getName(){
      const res = await fetch('http://127.0.0.1:8000/api/task-list/');
      const data = await res.json();
      this.data = data
    }
  }
});

const myObj = {
  name: 'Skip',
  age: 2,
  favoriteFood: 'Steak'
};

console.log("myObj",myObj)
console.log("myObj.string",JSON.stringify(myObj))

// document.getElementById('list-wrapper').innerHTML=`
// <p>Catman</p>
// <p>Dogman Doger</p>
// `

