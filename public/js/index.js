document.getElementById("").addEventListener("click", )
document.getElementById("").addEventListener("click", )
document.getElementById("").addEventListener("click", )
document.getElementById("").addEventListener("click", )
const friendCards = document.querySelectorAll(".friendCard");
friendCards.forEach(card => {
  card.addEventListener('click', function() {
    const viewProfile = document.querySelectorAll(".viewProfile")
  });
});
async function register(){
    
}
async function login(){
    
}
async function getUsers(){
    let list = await fetch("./getUsersFromServer")
    list = await list.json()

    let target = document.getElementById("users")

    let options = ""
    list.forEach(option => {
        options = options + `<option value="${option}">${option}</option>`
    })
    target.innerHTML = options
}


async function addFriend(){

}