let siteName=document.getElementById("siteName");
let siteUrl=document.getElementById("siteUrl");
let displaydata=document.getElementById("tdata")
let bookMarkList;

if(localStorage.getItem("bookMarkList")){
   bookMarkList= JSON.parse(localStorage.getItem("bookMarkList"));
   displayBookMark(bookMarkList);
}
else{
    bookMarkList=[];
}

function addUrl(){
   if(validateBookMarkUrl()  && validBookMarkName() ){
    let bookMarkOpj={
        sitename:siteName.value,
        siteurl:siteUrl.value
    }
    bookMarkList.push(bookMarkOpj)

    displayBookMark(bookMarkList);
    // clear();
    addToLocalStorage();
    console.log("okkkkkkkk");
}else{
    Swal.fire({
                title: "invaled Name OR Url",
                text: `${validateBookMarkUrl() === false ? "enter valid Url" : "" } ${validBookMarkName()===false ? "enter site name" : ""} `,
                icon: "error"
              });
   console.log("else");
            }
    
   }
function displayBookMark(){
    let container=""
    for(let i=0;i<bookMarkList.length;i++){
        container+=`
        <tr class="w-100 ">
        <td>${i+1}</td>
        <td>${bookMarkList[i].sitename}</td>
        <td> <a class="btn btn-success" id="view" href="${bookMarkList[i].siteurl}" target="_blank"><i class="fa-solid fa-eye"></i> View</a></td>
        <td> <button class="btn btn-danger" id="delete" onclick="DeleteBookMark(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`
    }
    displaydata.innerHTML=container;
    
}
function clear(bookMarkist){
    siteName.value=null;
    siteUrl.value=null;
}
function addToLocalStorage(){
    localStorage.setItem("bookMarkList",JSON.stringify(bookMarkList))
}
function DeleteBookMark(i){
    bookMarkList.splice(i,1);
    addToLocalStorage();        
    displayBookMark(bookMarkList);
}
function validateBookMarkUrl(){
 var Regex=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
 if(Regex.test(siteUrl.value)){
    siteUrl.classList.add("is-valid")
    siteUrl.classList.remove("is-invalid")
    return true;
 }
 else{
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")

    return false;
 }
}
function validBookMarkName(){
    let name="";
    if(siteName.value != ""){
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");

        
        console.log("valid");
        
    }else{
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
        console.log("nothing");
    }
}
