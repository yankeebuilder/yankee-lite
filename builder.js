
data= `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>
*{background:red}
</style>
  <h1>welcome to yankee the greatest html5 editor in the world</h1>  
  <h2>contribute to the project on <a href="https://github.com/ngdream/yankee">github</a></h2>
  <div style="height:100%">sdsds</div>
</body>
</html>
`
//class for elements
class Element
{ 
    constructor(viewelement)
    {
        this.depth=0
        this.uielement = document.createElement("div");
        this.viewelement = viewelement
        // et lui donne un peu de contenu
        var content = document.createTextNode(this.viewelement.tagName);
        // ajoute le nœud texte au nouveau div créé
        var childs = document.getElementById("ui-view")
        this.uielement.appendChild(content)
        this.uielement.innerHTML += `
        <div class="ui-childs">
        <div class="adder child"></div>
        <div class="childs">
        </div>
        <div class="adder next"></div>`;


        
        var extendadder = function (e) {
           
        }

        var resetadder = function (e) {
      
        }
        
        
        var addchild = function (e) {
           var  addedelement = document.createElement("div")
            var c = document.createTextNode("carte")
            addedelement.append(c)
            new Element(this.viewelement.appendChild(addedelement))
        }

        
        var addnext = function (e) {
            var  addedelement = document.createElement("div")
            var c = document.createTextNode("carte")
            addedelement.append(c)
            this.viewelement.after(addedelement)
            new Element(addedelement)
        }
        this.uielement.querySelector(".adder").addEventListener("mouseover",extendadder.bind(this))
        this.uielement.querySelector(".adder").addEventListener("mouseout", resetadder.bind(this))
        this.uielement.querySelector(".adder.child").addEventListener("click",addchild.bind(this))
        this.uielement.querySelector(".adder.next").addEventListener("click",addnext.bind(this))

        var overfunction = function (e) {
            e.stopPropagation();
            var rangeObj = document.createRange();
            rangeObj.selectNode(this.viewelement)
            console.log(this.viewelement)
        document.getSelection().addRange(rangeObj)
            //this.viewelement.setAttribute("style","background-color:#eef")
         
        };
        
        var outfunction = function (e) {
            e.stopPropagation();
           
            console.log(this.viewelement)
            this.viewelement.setAttribute("style","background-color:none")
         
        };
        this.uielement.addEventListener("mouseover", overfunction.bind(this))
        this.uielement.addEventListener("mouseout", outfunction.bind(this))
       

        for (let e = 0;e<Element.elements.length;e++)
            if (Element.elements[e].viewelement == this.viewelement.parentElement)
            {
                console.log(this.viewelement)
                this.parent = Element.elements[e]
                console.log("je suis la")
                this.depth = this.parent.depth + 1
                childs=this.parent.uielement.querySelector(".childs")
                }
        console.log(this.depth)
        childs.append(this.uielement)
        this.uielement.style = "position:relative;" 
        this.uielement.style.left=this.depth * 13 + "px"
        Element.elements.push(this)
    }

}
Element.elements=[]

//check is iframe for view is loaded
function checkIframeLoaded() {
    // Get a handle to the iframe element
    var iframe = document.querySelector('iframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
console.log(iframe.contentWindow.document.readyState)
    // Check if loading is complete
    if (  iframe.contentWindow.document.readyState  === "complete" ) {
        //iframe.contentWindow.alert("Hello")
    
        iframe.contentWindow.onload = function(){
            alert("I am loaded")
        };
      
        dataelements=iframe.contentWindow.document.querySelectorAll("*")
        for (let c=0; c < dataelements.length;c++)
        {
            new Element(dataelements[c],"")
            }
            
    
        return;
    } 
    
    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(checkIframeLoaded, 100);
}


//launc the program
function main()
{
    Htmlparser = new DOMParser()
    datadoc = Htmlparser.parseFromString(data, "text/xml");
    let elements = new Array()
    var dataelements=[]
    bodycontent = datadoc.getElementsByTagName("body")[0]
    iframe = document.querySelector("iframe")
 
/*iframe.src = "data:text/html;charset=utf-8," + encodeURI(bodycontent.innerHTML+` <script>window.addEventListener("message", function(event) {
    if (event.origin != 'http://javascript.info') {
      // something from an unknown domain, let's ignore it
      return;
    }
  
    alert( "received: " + event.data );
  
    // can message back using event.source.postMessage(...)
  });<script/>`);*/
    
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(data);
    iframe.contentWindow.document.close();
checkIframeLoaded()
      

    
    console.log(dataelements)
    console.log(dataelements)
   

}
main()