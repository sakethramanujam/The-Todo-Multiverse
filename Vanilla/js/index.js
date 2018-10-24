var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "Close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}




var Close = document.getElementsByClassName("Close");
var i;
for (i = 0; i < Close.length; i++) {
Close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
}
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
}
}, false);



function addli(){        
    var input = document.getElementById("textin").value;
    var node = document.createElement("LI");
    var textNode = document.createTextNode(input);
    node.appendChild(textNode);
    node.className = "mdl-list__item";
    if(input===""){
        window.alert("Please Enter Something!");
    }
    else{
    console.log(input);
    
    document.getElementById("add").appendChild(node);
    }
    document.getElementById("textin").value = "";

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "Close";
    span.appendChild(txt);
    node.appendChild(span);

    for (i = 0; i < Close.length; i++) {
        Close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
            }
        }

        

}
    


