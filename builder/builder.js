
let data = "<html>"+
"<header><title> simple</title><header/>"+
"<body>"+
    "<h1>Welcome to yankee</h1>" +
    "<h2>thank for helping</h2>"
"</body>"+
"</html>"

class Element
{ 
    constructor(viewelement,parent)
    {
        this.parent = parent
        this.uielement = document.createElement("div");
        // et lui donne un peu de contenu
        var content = document.createTextNode('Hi there and greetings!');
        // ajoute le nœud texte au nouveau div créé
        this.uielement.appendChild(content);
        document.getElementById("ui-view").append(this.uielement)
        this.viewelement = viewelement
        var overfunction = function() {
            var rangeObj = document.createRange ();
            console.log(this.viewelement)
            rangeObj.selectNode(this.viewelement);
            this.viewelement.setAttribute("style","background-color:#eef")
         
        };
        
        var outfunction = function() {
            var rangeObj = document.createRange ();
            console.log(this.viewelement)
            rangeObj.selectNode(this.viewelement);
            this.viewelement.setAttribute("style","background-color:none")
         
        };
        this.uielement.addEventListener("mouseover", overfunction.bind(this))
        this.uielement.addEventListener("mouseout", outfunction.bind(this))
    }

}


function main()
{
    parser = new DOMParser()
    datadoc = parser.parseFromString(data, "text/xml");
    let elements = new Array()
    
    bodycontent = datadoc.getElementsByTagName("body")[0]
    document.getElementById("view-section").innerHTML = bodycontent.innerHTML
    
    dataelements = document.getElementById("view-section").querySelectorAll("*")
    console.log(dataelements)
    for (let c=0; c < dataelements.length;c++)
    {
        new Element(dataelements[c],"")
        }
        


}
main()