const { response } = require("express")

console.log('heelo')
//const { json } = require("body-parser")

const update = document.querySelector('.update-button')

update.addEventListener('click', _ => {
  // Send PUT Request here
  fetch('/quotes',{
    method:'put',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
        name : "boba",
        quote : '3awz anyk'
    })
  }).then(res =>{
    if(res.ok) return res.json
  }).then(response =>{
    window.location.reload(true)
  })
})
console.log('www')