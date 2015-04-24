function MenuChoice() {
    if (document.getElementById("menu").value == "Category List") {
        
        document.getElementById("area1").style.visibility = "visible";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "hidden";
        ListCategory();
         
    }
    else  if (document.getElementById("menu").value == "Create Category"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "visible";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "hidden";
         
    }
    else  if (document.getElementById("menu").value == "Change Category"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "visible";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "hidden";
    }
    
    else if (document.getElementById("menu").value == "Delete Category"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "visible";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "About"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "visible";
        document.getElementById("area6").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Contact Us"){
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "visible";
    }
    else {
        document.getElementById("area1").style.visibility = "hidden";
        document.getElementById("area2").style.visibility = "hidden";
        document.getElementById("area3").style.visibility = "hidden";
        document.getElementById("area4").style.visibility = "hidden";
        document.getElementById("area5").style.visibility = "hidden";
        document.getElementById("area6").style.visibility = "hidden";
    }
}

function ListCategory() {
    
    var objRequest = new XMLHttpRequest(); //create AJAX request object
    
    //create URL and JQuery string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/getAllCategories";
 
    
    //checks that the object has returned data
    objRequest.onreadystatechange = function() {
         
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output1=JSON.parse(objRequest.responseText);
            GetAllCategoriesResult(output1);
        }
    }
    
    //initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function GetAllCategoriesResult(result) {
    var count = 0;
    var displayAllCategory = "";
    
    //loop to extract data from the response object
    for (count=0; count < result.GetAllCategoriesResult.length; count++) {
        
        displayAllCategory += "<tr><td align='center'>" + result.GetAllCategoriesResult[count].CID + "</td><td>"
                        + result.GetAllCategoriesResult[count].CName + "</td><td>"
                        + result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
    }
    
    document.getElementById("displaycategory").innerHTML = displayAllCategory;
}

function CreateCategory() {
    
    var objRequest2 = new XMLHttpRequest(); //create AJAX request object
    
    vnewcatNAME = (document.getElementById("newcatNAME").value);
    vnewcatDESC = (document.getElementById("newcatDESC").value);
    
    //create URL and JQuery string
    var url2 = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/CreateCategory";
    var newcatinfo = '{"CName":"'+vnewcatNAME+'","CDescription":"'+vnewcatDESC+'"}';
 
    
    //checks that the object has returned data
    objRequest2.onreadystatechange = function() {
         
        if (objRequest2.readyState == 4 && objRequest2.status == 200) {
            var output2=JSON.parse(objRequest2.responseText);
            CreateCategoriesResult(output2);
        }
    }
    
    //initiate the server request
    objRequest2.open("POST", url2, true);
    objRequest2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest2.send(newcatinfo);
}

function CreateCategoriesResult(output2) {
    
    if (output2.WasSuccessful  == 1) {
        document.getElementById("result2").innerHTML = "The operation was successful!! ";
         
        }
    else  if (output2.WasSuccessful == 0) {
        document.getElementById("result2").innerHTML = "The operation was not successful! unspecified error  " + output2.Exception;
        }
    
}


function UpdateCatDescription() {
    var objRequest3 = new XMLHttpRequest();
    var url3 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //collect customer data from web page
    var vcatid3 = 0;
    vcatid3 = Number(document.getElementById("categoryID3").value);
    var vcatdesc3 = (document.getElementById("categoryDESC3").value);
     
    
    //create the parameter string
    var newaddress = '{"CID":'+vcatid3+',"CDescription":"'+vcatdesc3+'"}';
 //   url3 += newaddress;
    
    //checking fo Ajax operation return
    objRequest3.onreadystatechange = function() {
    
    if (objRequest3.readyState == 4 && objRequest3.status == 200) {
            catresult = JSON.parse(objRequest3.responseText);
            OperationResult3(catresult);
        }
    }
    //start Ajax request
    objRequest3.open("POST", url3, true);
    objRequest3.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest3.send(newaddress);
}



function OperationResult3(catresult) {
    var newStatus = catresult;
    
    if (catresult.WasSuccessful  == 1) {
                
        document.getElementById("displaycatchg").innerHTML = "<h2 class='text-success'>The operation was successful!! </h2>";
         
        }
    else  if (catresult.WasSuccessful == 0) {
        document.getElementById("displaycatchg").innerHTML = "<h2 class='text-danger'>The operation was not successful! <br>unspecified error  " + catresult.Exception +"</h2>";
        }
    else  if (catresult.WasSuccessful == -2) {
        document.getElementById("displaycatchg").innerHTML = "<h2 class='text-danger'>The operation was not successful! <br> deserialized data string  "+ catresult.Exception+"</h2>";
        }
    else  if (catresult.WasSuccessful == -3) {
        document.getElementById("displaycatchg").innerHTML = "<h2 class='text-danger'>The operation was not successful! <br>record not found " + catresult.Exception+"</h2>";
        }        
         
}


function GetCategory() {
    
    var objRequest = new XMLHttpRequest(); //create AJAX request object
    
    //create URL and JQuery string
    var urlNext = "http://bus-pluto.ad.uab.edu/jsonwebService/service1.svc/getAllCategories";
 
    
    //checks that the object has returned data
    objRequest.onreadystatechange = function() {
         
        if (objRequest.readyState == 4 && objRequest.status == 200) {
            var output4=JSON.parse(objRequest.responseText);
            GetCategoryResults(output4);
        }
    }
    
    //initiate the server request
    objRequest.open("GET", urlNext, true);
    objRequest.send();
}
function GetCategoryResults(result4) {
    var count = 0;
    var getcat = 0;
    getcat = Number(document.getElementById("categoryID4").value);
    
    var gettblhdr = " "
    var getCategoryID = "<h4> Category ID Not Found</h4>";
    
    //loop to extract data from the response object
    for (count=0; count < result4.GetAllCategoriesResult.length; count++) {
            
        if (result4.GetAllCategoriesResult[count].CID == getcat) {
            var gettblhdr ="<h4>Category Selected for Deletion:</h4> "
                gettblhdr += "<thead><tr><th>Category ID</th><th>Category Name</th><th>Description</th></tr></thead>";
            var getCategoryID = "<tr><td>" + result4.GetAllCategoriesResult[count].CID + "</td><td>"
                            + result4.GetAllCategoriesResult[count].CName + "</td><td>"
                            + result4.GetAllCategoriesResult[count].CDescription + "</td></tr>";
            break;                
        }                
    }
    document.getElementById("confirmDel").innerHTML = gettblhdr;
    document.getElementById("delcatID").innerHTML = getCategoryID;
}


function DeleteCategory() {
    var objRequest4 = new XMLHttpRequest();
    var url4 = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/"
    
    
    //collect customer data from web page
    var vcatid4 = document.getElementById("categoryID4").value;
    url4 += vcatid4;
    
    //checking fo Ajax operation return
    objRequest4.onreadystatechange = function() {
 
     
    if (objRequest4.readyState == 4 && objRequest4.status == 200) {
            result4 = JSON.parse(objRequest4.responseText);
            OperationResult4(result4);
        }
    }
    
    //start Ajax request
    objRequest4.open("GET", url4, true);
//    objRequest4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest4.send();
}
    
function OperationResult4(result4) {
    var newStatus4 = result4.value;
    
    if (result4.DeleteCategoryResult.WasSuccessful  == 1) {
        document.getElementById("confirmDel").innerHTML = " ";
         
        document.getElementById("delcatID").innerHTML = "<h2 class='text-success'>The delete operation was successful!!</h2> ";
         
        }
    else   if (result4.DeleteCategoryResult.WasSuccessful == 0) {
        document.getElementById("delcatID").innerHTML = "<h2 class='text-danger'>The delete operation was not successful! unspecified error</h2>  " + result3.Exception;
        document.getElementByID("input-group-btn").innerHTML = " "; 
        }
           
         
}    