const app = document.getElementById('root');
const search = document.getElementById('seeker')
const container = document.createElement('data');


container.setAttribute('class', 'container');

app.appendChild(search);
app.appendChild(container);

var pagenumber = 1;

function keyfunc(){
  var input, filter, table, tr, td, i, txtValue, flag;
  input = document.getElementById('seeker');
  filter = input.value.toString().toLowerCase();
  table = document.getElementById("listbanks");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++)
   {
     flag = 0;
     td = tr[i].getElementsByTagName("td");
       for (j = 0; j < td.length; j++){
           if (td[j]) {
              txtValue = td[j].textContent || td[j].innerText;
              txtValue = txtValue.toString().toLowerCase();
                  if (txtValue.indexOf(filter) == 0) {
                       tr[i].style.display = "";
                       flag = 1;
                       break;
                     }
                 }
           if (flag==0){
              tr[i].style.display = "none";
                 }  
          }       
    }
}


var fav = ["ALLAHABAD BANK", "BANK OF BARODA"];

function Createtable(jsondata)
   {
     var l=0;
     cols = ["ifsc", "Bank_id", "Branch", 'Address', 'City', 'District', 'State', 'Bank_name']
     var table = document.getElementById("listbanks");
     var tr = document.createElement("tr");
  
     for (var k in cols)
       {
          var th = document.createElement("th");
          var txt = document.createTextNode(cols[k]);
          th.appendChild(txt);
          tr.appendChild(th);
       }
  
      table.appendChild(tr);
      jsondata.forEach(entry => {
          l=l+1;
         var tr = document.createElement("tr");
           for (var i in entry){
               var td = document.createElement("td");
               var txt = document.createTextNode(entry[i]);
                  if (i == 'bank_name')
                    {
                      if(fav.includes(entry[i])){
                         tr.setAttribute('class', 'favrow');
                           }
                    }
              td.appendChild(txt);
              tr.appendChild(td);
               }
            table.appendChild(tr);
            tr.addEventListener("click", function(){ openbankpage(tr); }, false); });
         }

var request = new XMLHttpRequest();
request.open('GET', 'https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
        Createtable(data);
        disp(25, pagenumber);
     } 
  else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `It's not working!`;
    app.appendChild(errorMessage);
     }
   }

request.send();



function favonly(){
  var table = document.getElementById("listbanks");
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) 
     {
        td = tr[i].getElementsByTagName("td");
        var txtValue = td[td.length-1].textContent || td[td.length-1].innerText;
        txtValue = txtValue.toString().toUpperCase();

        if (fav.includes(txtValue))
           {
              tr[i].style.display = "";
           }

        else
           {
              tr[i].style.display = "none";
           }
      }
  }


function disp(size, num){
  var table = document.getElementById("listbanks");
  tr = table.getElementsByTagName("tr");

  for(var i=1; i<tr.length; i++){
     if (i < size*num && i > (size*num)-size){
         tr[i].style.display = "";
        }
    else{
      tr[i].style.display = "none";
     }
   }
  }


function changenumber(){
     var selectBox = document.getElementById("noperpage");
     var selectedValue = selectBox.options[selectBox.selectedIndex].value;
       
       if(selectedValue == "-select size-"){
          selectedValue = 25;
          }
     var num = 1;
     disp(selectedValue, num);
    }


function pageup(){
  pagenumber++;

    var selectBox = document.getElementById("noperpage");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;

    if(selectedValue == "-select size-"){
    selectedValue = 25;
  }
    var table = document.getElementById("listbanks");
    tr = table.getElementsByTagName("tr");

    if (selectedValue*pagenumber>tr){
      button = document.getElementById("pgup");
      button.disabled = true;
    }

    button2 = document.getElementById("pgdn");
      if (button2.disabled){
      button2.disabled = false;
      }

    disp(selectedValue, pagenumber);
}

function pagedown(){
    pagenumber--;

    var selectBox = document.getElementById("noperpage");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue == "-select size-"){
    selectedValue = 25;
  }
    var table = document.getElementById("listbanks");
    tr = table.getElementsByTagName("tr");

    if (pagenumber==1){
      button = document.getElementById("pgdn");
      button.disabled = true;
    }

    button2 = document.getElementById("pgup");
    if (button2.disabled){
      button2.disabled = false;
    }

    disp(selectedValue, pagenumber);
}



function dispcity(){
    var selectBox = document.getElementById("whatstate");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
   if(selectedValue == "-select size-"){
    selectedValue = 25;
  }
    selectedValue =  selectedValue.toUpperCase()
    var table = document.getElementById("listbanks");
    tr = table.getElementsByTagName("tr");

    for (var i=1; i<tr.length;i++){
      td = tr[i].getElementsByTagName("td");

      var txtValue = td[4].textContent || td[4].innerText;
      txtValue = txtValue.toString().toUpperCase();

      if (txtValue == selectedValue){
        tr[i].style.display = "";
      }

      else{
        tr[i].style.display = "none";
      }
    }
  }


function openbankpage(row){
   var td = row.getElementsByTagName('td');
   var txtValue = td[7].textContent || td[7].innerText;

   window.open("https://banks/"+txtValue+".html");
 }


