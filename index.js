var siteName = document.getElementById('siteName');
//var siteURL = document.getElementById('siteURL');
var btnAdd = document.getElementById('btnAdd');
var btnUpdate = document.getElementById('btnUpdate');
var deleteBtn = document.getElementById('deleteBtn');
var deleteAll = document.getElementById('deleteAll');
var productRow = document.getElementById('productRow');
var searchProduct = document.getElementById('searchProduct');
let url = document.querySelector("[name='siteURL']");
const button = document.getElementById('siteURL');
const deleteAllButton = document.getElementById('deleteAll'); 

var siteList;


let mood = 'create';
let tmp;
if (localStorage.getItem('products') !== null) {
  siteList = JSON.parse(localStorage.getItem('products'));
 displaySite();
}
 else {
  siteList = [];
}

// create 
btnAdd.onclick = function(){
  addSite();
  clearSite();
 displaySite();
  //  let dataLink = url;

}




function addSite(){
  if (Validation(siteName) && Validation(siteURL)) {
    var product = {
      sName: siteName.value,
      sUrl: siteURL.value,
    }

    siteList.push(product);
      displaySite();
    localStorage.setItem('products', JSON.stringify(siteList));
  }
}

function clearSite(){
  siteName.value = '';
  siteURL.value = '';
}
function displaySite()
{
  var box = '';
  for (let i = 0 ; i < siteList.length ; i++) {
    box += `
   
 <div class="row row-cols-1 row-cols-md-3 g-2 justify-content-center align-content-center">
   <div class="col ">
     <div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <h2>Welcome to the site</h2>
    </div>
    <div class="flip-card-back">
      <div class="card-body">
        <p class="card-text">
          Name : ${siteList[i].sName}
        </p>
        <p class="card-text">
        url: ${siteList[i].sUrl}
        </p>
         <p class="card-text d-flex justify-content-between">
         <button onclick="visitsite(${i})" type="button" class="btn btn-outline-success btn-rounded" data-mdb-ripple-init data-mdb-ripple-color="dark" id="siteURL"> <a class="visit" href="" target="_blank">Visit </a> <i class="fa-regular fa-eye"></i></button>
          <button onclick="updateFun(${i})" type="button" class="btn btn-outline-warning  btn-rounded" data-mdb-ripple-init data-mdb-ripple-color="dark">Update  <i class="fa-solid fa-pencil"></i></button>
        
        </p>
        <button onclick="deleteFun(${i})" type="button" class="btn btn-outline-danger btn-rounded w-100" data-mdb-ripple-init data-mdb-ripple-color="dark">Delete <i class="fa-solid fa-trash-can"></i></button>
      </div>
    </div>
  </div>
   </div>
</div>
  </div>
 </div>


     `;
  }
  document.getElementById('rowData').innerHTML = box;
  // rowData.innerHTML = box;
  let btnDelete = document.getElementById('deleteAll');
  if (siteList.length > 0) {
   btnDelete.innerHTML = `
    <button onclick="deleteAll(${siteList.length})" class="btn btn-outline-danger mb-3 w-100 btn-sm"> Delete All  </button>`;
  } else {
    btnDelete.innerHTML = '';
  }
  
}

//search
searchProduct.oninput = function() {
  searchProducts();
};

function searchProducts() {
  var term = searchProduct.value.trim().toLowerCase();
  var searchedArr = [];
  for (var i = 0; i < siteList.length; i++) {
    if (siteList[i].sName.trim().toLowerCase().includes(term) == true) {
      searchedArr.push(siteList[i]);
    }
  }
   displaySite(searchedArr);
}


// Delete
function deleteFun(index){
  siteList.splice(index, 1);
  localStorage.setItem('products', JSON.stringify(siteList));
  displaySite();
}

function deleteAll(){
   localStorage.clear(); 
  siteList.splice(0);
 displaySite();
}

//update

var globalIndex;
function editForUpdate(index){
  globalIndex = index;
  btnUpdate.classList.remove('d-none');
  btnAdd.classList.add('d-none');
  siteName.value = siteList[index].sName;
  siteURL.value = siteList[index].sUrl;
}

function updateFun(){
  btnAdd.classList.add('d-none');
  btnUpdate.classList.remove('d-none');
  siteList[globalIndex].sName = siteName.value;
  siteList[globalIndex].sUrl = siteURL.value;
  localStorage.setItem('list', JSON.stringify(siteList));
 displaySite();
}
btnUpdate.onclick = function(){
  updateFun();
};

//visit
function visitSite(index) {
  window.open(siteList[index].sUrl, '_blank');
}

//validation
function Validation(ele){
  var Regex = {
    siteName: /^[A-Z][a-z]{3,10}$/,
    siteURL:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)?/gi,
  };
  if (Regex[ele.id].test(ele.value)) {
    ele.classList.add('is-valid');
    ele.classList.remove('is-invalid');
    ele.nextElementSibling.classList.replace('d-block', 'd-none');
    return true;
  } 
  else {
    ele.classList.add('is-invalid');
    ele.classList.remove('is-valid');
    ele.nextElementSibling.classList.replace('d-none', 'd-block');
    return false;
  }
}

