var inbutName = document.getElementById("setName");
var inbutURL = document.getElementById("setURL");
var btnSubmit = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");


var dataLink = [];
if(localStorage.getItem('bookmarkList')){
    dataLink=JSON.parse(localStorage.getItem('bookmarkList'));
    displayBookMark(dataLink);
}
else{
    dataLink=[];
}
// validation
function validateInputs() {
    var nameRegex = /^[a-zA-Z0-9\s]{3,50}$/;
    var urlRegex = /^(?!https:\/\/)(www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,})(\/.*)?$/;

    if (!inbutName.value.trim() || !nameRegex.test(inbutName.value.trim())) {
        Swal.fire({
            icon: "error",
            title: "Invalid Name",
            text: "Name must be 3-50 characters long and contain only letters, numbers, and spaces.",
        });
        return false;
    }
    
    if (!inbutURL.value.trim() || !urlRegex.test(inbutURL.value.trim())) {
        Swal.fire({
            icon: "error",
            title: "Invalid URL",
            text: "Please enter a valid URL (e.g., example.com or www.example.com).",
        });
        return false;
    }
    

    return true;
}

//Create
var dataLink;
if (localStorage.bookmarkList != null) {
    dataLink = JSON.parse(localStorage.bookmarkList)
} else {
    var dataLink = [];
}

btnSubmit.onclick = function (e) {
    if (!validateInputs()) {
        return;
    }
    var newWep = {
        inbutName: inbutName.value,
        inbutURL: inbutURL.value,
    }
    if (dataLink.some(item => item.inbutURL === newWep.inbutURL)) {
        Swal.fire({
            icon: "warning",
            title: "Duplicate Bookmark",
            text: "This bookmark already exists!",
        });
        return;
    }
    
    dataLink.push(newWep);
    localStorage.setItem('bookmarkList', JSON.stringify(dataLink));
    displayBookMark(dataLink);
    clearInputs();

}

//display
function displayBookMark(arr) {
    var bookMarks = ``;
    for (var i = 0; i < arr.length; i++) {
        bookMarks += `
                                    <tr>
                        <td>${i + 1}</td>
                        <td>${arr[i].inbutName}</td>
                        <td>
                        <a href="https://${arr[i].inbutURL}" target="_blank" aria-label="Visit ${arr[i].inbutName}">
                            <button class="btn btn-visit">
                            <i class="fa-solid fa-eye pe-2"></i>
                            Visit
                            </button>
                            </a>
                        </td>
                        <td>
                            <button id="btnDelete" onclick="deleteBookMark(${i})" class="btn btn-delete">
                            <i class="fa-solid fa-trash-can"></i>
                            Delete
                            </button>
                        </td>
                        </tr>
        `;
    }
    tableContent.innerHTML = bookMarks;
}

//delete 
function deleteBookMark(deleteBook){
    dataLink.splice(deleteBook, 1);
    localStorage.setItem('bookmarkList', JSON.stringify(dataLink));
    displayBookMark(dataLink);
}
//clear

function clearInputs(){
    inbutName.value = null;
    inbutURL.value = null;
}