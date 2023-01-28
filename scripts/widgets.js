var tools = document.querySelector(".tools")
var dialogs = document.querySelector(".dialog-wrapper")

var toolbuttons = tools.querySelectorAll("button")
var entity_dialog = `
<div class=" dialog">
<input type="text" placeholder="entity name" name="" id="">
<div class="attributes"></div>
<div class="addattributes">
    <input type="text" placeholder="attribute name" name="" id=""> 
    <button>add</button>

</div>
</div>

`

var relationtypedialog = `
<div class=" dialog relationtype">
<div class="custom-select" style="">
    <select>
      <option value="0">0,1</option>
      <option value="1">1,1</option>
      <option value="2">0,N</option>
      <option value="3">1,N</option>
    </select>
  </div>
<button>change</button>

</div>
</div>

`


// document.addEventListener('keypress', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
//   }, false);
  
document.getElementById("donate-button").addEventListener('click', (event) => {
    dialogs.classList.add("active")
    dialogs.innerHTML = `
    <div class=" dialog ">

    <a class="donate" href="https://www.paypal.com/donate/?hosted_button_id=2NGECBY5Y635C">donate with paypal</a>
    <a class="donate" href="" id="mm">donate with mtn or orange (<span class="alert">anavailable for now</span> )</a>
</div>
    
    `
    
})
toolbuttons.forEach(element => {
    
    element.addEventListener("click", () => {

        var activebtn = tools.querySelector("button.active")
        if (activebtn)
            activebtn.classList.remove("active")
        
    element.classList.add("active")
    })
});

document.querySelector("#photo").addEventListener("click", () =>
{
    let canvas =document.querySelector("canvas")

    let newcanvas = document.createElement("canvas")
    newcanvas.width = 856
    newcanvas.height = 700
    
    let ctx = newcanvas.getContext('2d');
    ctx.scale(0.2, 0.2)
    ctx.drawImage(canvas,0,0,newcanvas.width,newcanvas.height,0,0,newcanvas.width,newcanvas.height)

    let downloadlink = document.createElement("a")
    downloadlink.download="diagram.jpeg"
    downloadlink.href= newcanvas.toDataURL('image/jpeg')
    downloadlink.click()
    
})


function getaction()
{
    var  activatebtn = tools.querySelector("button.active")
    return activatebtn.getAttribute("data-action")
}



document.oncontextmenu = function(e){
 stopEvent(e);
}
function stopEvent(event){
 if(event.preventDefault != undefined)
  event.preventDefault();
 if(event.stopPropagation != undefined)
  event.stopPropagation();
}



var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);