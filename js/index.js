let btnSubmit = document.querySelectorAll(".submit button");
let boxSubmit = document.querySelector(".box-submit");
let closeBtn = document.getElementById("closeBtn");
let bookmarkName =document.getElementById("bookmarkName")
let bookmarkURL =document.getElementById("bookmarkURL")
let tableContent = document.getElementById("tableContent");
let deleteBtns;
let visitBtns;
let bookmarks = [];
//add
if (localStorage.getItem("bookmarksList") !== null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  displayData(); 
}


displayData()

function addBookmark(){
    let book={
        name:bookmarkName.value,
        url:bookmarkURL.value      
      }
     bookmarks.push(book);
     localStorage.setItem("bookmarksList",JSON.stringify(bookmarks))

     clearForm();
     displayData();
   /////////
     
}
function clearForm(){
    bookmarkName.value=null;
    bookmarkURL.value=null;

    bookmarkName.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-valid");
   
}
function displayData(){
  let newBookmark = "";
  for(let i =0 ; i<bookmarks.length ; i++){
    newBookmark +=`
    <tr>
    <td>${i+1}</td>
    <td>${bookmarks[i].name}</td>              
    <td>
      <button class="btn btn-visit" data-index="${i}"  onclick="visitbtn(${i})" >
        <i class="fa-solid fa-eye pe-2"></i>Visit
        
      </button>  
    </td>
    <td>
      <button class="btn btn-delete pe-2" onclick="deletbtn(${i})" data-index="${i}">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>
    
    `
  }
  tableContent.innerHTML = newBookmark
}

function deletbtn(indexDelete) {
  bookmarks.splice(indexDelete, 1);
  localStorage.setItem("bookmarksList",JSON.stringify(bookmarks))
  displayData();
}

function visitbtn(index) {
  const url = bookmarks[index].url;
  if (url) {
      window.open(url, "_blank");
  }
}

//box-submit
for (let i = 0; i < btnSubmit.length; i++) {
    btnSubmit[i].addEventListener("click", function () {
        if (validtionName() && validtionURL()) {  
          addBookmark()
          console.log("hello")
            
        } else {      
            boxSubmit.classList.remove("d-none");
        }
    });
}
  
  closeBtn.addEventListener("click", function () {
    boxSubmit.classList.add("d-none");
  });
  function closeSlide(){
      boxSubmit.classList.add("d-none");
  }
  document.addEventListener("click",function(e){
      if(e.target === boxSubmit){
          closeSlide()
      }
      
  }) 

//validation

function validtionName(){
    let regex=/^[a-zA-Z][a-zA-Z0-9]{2,}$/ ;
    let text=bookmarkName.value;
    if(regex.test(text)){
          bookmarkName.classList.add("is-valid");
          bookmarkName.classList.remove("is-invalid");
          return true;
    }
    else{
          bookmarkName.classList.add("is-invalid")
          bookmarkName.classList.remove("is-valid")
          return false;
    }
}

function validtionURL(){
    let regex=/^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/.*)?$/ ;
    let text=bookmarkURL.value;
    if(regex.test(text)){
          bookmarkURL.classList.add("is-valid");
          bookmarkURL.classList.remove("is-invalid");
          return true;
    }
    else{
          bookmarkURL.classList.add("is-invalid")
          bookmarkURL.classList.remove("is-valid")
          return false;
    }
}

