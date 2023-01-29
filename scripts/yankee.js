

actiontype = "move" //we set the default action type to move

//we initialize the canva cantext
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");


function isPointOnLine(px, py, x1, y1, x2, y2, width) {

    return distancePointFromLine(px, py, x1, y1, x2, y2, width) <= width / 2
  }
  
  function distancePointFromLine(x0, y0, x1, y1, x2, y2) {
    return Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
  }
  



/** 
 * Draws a rounded rectangle using the current state of the canvas.  
 * If you omit the last three params, it will draw a rectangle  
 * outline with a 5 pixel border radius  
 * @param {Number} x The top left x coordinate 
 * @param {Number} y The top left y coordinate  
 * @param {Number} width The width of the rectangle  
 * @param {Number} height The height of the rectangle 
 * @param {Object} radius All corner radii. Defaults to 0,0,0,0; 
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false. 
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true. 
 */
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
    }

    this.beginPath();
    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (stroke) {
        this.stroke();
    }
    if (fill) {
        this.fill();
    }
}

var priorityitem = null // store the item atualy (moved,etc...) 


//an object for current mouse position
const mouseposition = {
    x: 0,
    y:0
}

const moveshift = {
    x: 0,
    y:0
}


dialogs.addEventListener('click', (e) => {
    e.target.classList.remove("active")
   
})



//this is a class implemented by every diagrams item in yankee
class Item
{
    draw()
    {
        ctx.strokeStyle = (this.selected) ? "rgb(34, 48, 255)" : "black"
        ctx.font = "15px Arial";
    }  
    edit()
    {
        dialogs.classList.add("active")
    }
}


//this is a class for every item of mcd
class McdItem extends Item
{

    constructor(x, y)
    {
        super()
        this.selected = false
        this.attributes = []
        this.setposition(x- this.getsize().w/2,y-this.getsize().h/2)
    }

    //set item position
    setposition(x, y)
    {
        this.x = x
        this.y = y
    }

    draw()
    {
        super.draw()

    }

    getsize() {
        return {w: McdItem.width, h:this.attributes.length*20 +40}
    }

    getcenter()
    {
        return{x:this.x + this.getsize().w/2, y:this.y + this.getsize().h/2}
    }

    addattribute(attribute)
    {
        var pattern = /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]*$/g;
        
        if (attribute == "" || pattern.test(attribute) || /^[0-9]/.test(attribute))
            console.error("cannot add attribute it must not have special character or start by number")
        else if (this.attributes.indexOf(attribute) != -1)
            console.error("attribute already exist")
        else
            this.attributes.push(attribute)
    }

    edit()
    {
        super.edit()
        dialogs.innerHTML = entity_dialog
        var addinput = dialogs.querySelector("#addinput")
        var attrsctn = dialogs.querySelector(".attributes")
        var name = dialogs.querySelector("#name")
        
    
        name.addEventListener("input", () => {
        this.name=name.value
        })
        this.attributes.forEach(attr =>
        {
            attrsctn.innerHTML+=`<div>¨${attr}<div>`
            })
        dialogs.querySelector("#add").addEventListener("click", () =>
        {
            this.addattribute(addinput.value)
        })

    }

}


McdItem.width=115 //we set the default width to  130



//class for entity
class Entity extends McdItem
{
    constructor(x,y)
    {
        super(x,y)
        this.name="entity "+(entities.length+1)
        entities.push(this)
    } 


    draw()
    {
        super.draw()
        
        ctx.beginPath()

        ctx.rect(this.x, this.y, McdItem.width, this.getsize().h)
        ctx.rect(this.x, this.y, McdItem.width, 30)
        ctx.fillStyle="white"
        ctx.fill()
        ctx.fillStyle="black"
        ctx.fillText(this.name, this.x + 40, this.y + 20); 
        
        this.attributes.forEach(attribute => {
            ctx.fillText("- "+attribute, this.x + 30 , this.y + 50 + this.attributes.indexOf(attribute)*20); 
        });
        ctx.stroke();
    }
    edit()
    {
        super.edit()  
    }
}
  

//class for relations
class Relation extends McdItem
{
    constructor(x,y)
    {
        super(x, y)
        this.name= "relation "+(relations.length+1)
        relations.push(this)
    }
    
    //draw the relation
    draw()
    {
        super.draw()
        ctx.beginPath()
        ctx.roundRect(this.x, this.y, this.getsize().w, this.getsize().h, { upperLeft: 20, upperRight: 20, lowerLeft: 20, lowerRight: 20 }, true, true);
        ctx.moveTo(this.x, this.y + 30)
        ctx.lineTo(this.x+McdItem.width,this.y + 30)
        ctx.fillStyle="white"
        ctx.fill()

        ctx.fillStyle="black"
        ctx.fillText(this.name, this.x + 40, this.y + 20); 
        
        this.attributes.forEach(attribute => {
            ctx.fillText("- "+attribute, this.x + 30 , this.y + 50 + this.attributes.indexOf(attribute)*20); 
        });
        ctx.stroke()
    }

    //edit the relation
    edit()
    {
        super.edit()  
    }
    

}


//class for Mcd connection
class Connection extends Item
{

    constructor(entity,relation)
    {
        super()
        this.relation = relation
        this.entity = entity
        this.type = "1,n"
        this.selected = false
      
        connections.push(this)
    }

    //draw the connection
    draw()
    {   
        super.draw()
        if (!(this.relation && this.entity))
            ctx.strokeStyle = "green"
        else
            ctx.strokeStyle = "black"
        ctx.beginPath()
        if (this.entity && this.relation)
        {
            ctx.moveTo(this.relation.getcenter().x,this.relation.getcenter().y) 
            ctx.lineTo(this.entity.getcenter().x, this.entity.getcenter().y) 
            ctx.fillStyle="black"
            
            ctx.fillText(this.type,((this.entity.x+this.relation.x)/2)+20,((this.entity.y+this.relation.y)/2)+30); 
        }
        else if (this.entity)
        {
            ctx.lineTo(this.entity.getcenter().x, this.entity.getcenter().y) 
            ctx.lineTo(mouseposition.x,mouseposition.y)
        }
        else
        {
            ctx.moveTo(this.relation.getcenter().x,this.relation.getcenter().y) 
            ctx.lineTo(mouseposition.x, mouseposition.y) 

        }

        
     
        ctx.stroke()

    }

    contain(x,y)
    {
 
        return isPointOnLine(x,y,this.relation.getcenter().x,this.relation.getcenter().y,this.entity.getcenter().x,this.entity.getcenter().y,10)
    }

    // edit connection relation
    edit()
    {
        super.edit()
        dialogs.innerHTML=relationtypedialog
    }

    // remove the connection
    remove()
    {
        connections.splice(connections.indexOf(this),1)
    }
}


//arrays to store every  items
var entities = [] 
var relations = []
var connections = []




canvas.addEventListener("mousedown",
    (e) => {
        actiontype = getaction()
    
        entities.forEach(item => item.selected = false)
        relations.forEach(item => item.selected = false)
        if (actiontype == "move")//we check if action type is  for move an item
        {
            
            item = entities.reverse().find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y +item.getsize().h)) || relations.reverse().find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y + item.getsize().h))
            connection = connections.find(connection => connection.contain(e.offsetX, e.offsetY))
            if(connection)
            console.log(connection.type)

            if (item)
            {

                
                if (priorityitem)
                priorityitem.selected=false
                priorityitem = item
                priorityitem.selected=true
                moveshift.x = e.offsetX - priorityitem.x
                moveshift.y=e.offsetY-priorityitem.y
            }
            entities.reverse()
        }


        else if (actiontype=="addconnection")//we check if action type is  for add a new connection
        {
            item = entities.find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y +item.getsize().h)) || relations.reverse().find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y + item.getsize().h))
          
            if (item)
            {
                if (!priorityitem)
                {
                    if (item instanceof Entity)
                        priorityitem = new Connection(item, null)
                    else 
                        priorityitem = new Connection(null, item)
                    
                    }

                else
                {

                    
                    if (item instanceof Entity)//check if the second connection item is an entity
                    {
                        if (priorityitem.entity)//check if the first item connection was an entity
                        {
                            //we create a new relation between the entities
                            newrelation= new Relation((priorityitem.entity.x+item.x+item.getsize().w/2+priorityitem.entity.getsize().w/2)/2, (priorityitem.entity.y+item.y+item.getsize().h/2+priorityitem.entity.getsize().h/2)/2)
                            priorityitem.relation = newrelation
                            new Connection(item,newrelation)
                        }
                        else //other else the first was relation
                        {
                            priorityitem.entity = item
                        }       
                        
                  }
                    
                    else 
                    {
                        if (priorityitem.entity)
                        {
                            priorityitem.relation = item
                        }
                        else
                            priorityitem.remove()
                        
                        }
                           
              priorityitem=null
                }
            
            }
            else
            {
                if (priorityitem)
                    priorityitem.remove()
             priorityitem=null
            }  
            }   
    })

 // handle action when  we do a  bouble click on the canvas
    canvas.addEventListener("dblclick",
        (e) => {
        
        //check if we clicked an item
        item = entities.reverse().find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y +item.getsize().h)) || relations.reverse().find(item => ((e.offsetX >= item.x && e.offsetX <= item.x + McdItem.width) && e.offsetY >= item.y && e.offsetY <= item.y + item.getsize().h))|| connections.find(connection => connection.contain(e.offsetX, e.offsetY))
        
        if (item)
        {
            if (actiontype=="move")
           item.edit()
            }
    })


// handle action when mouse moves on the canvas
canvas.addEventListener("mousemove",
    (e) => {

        //get current mouse position
        mouseposition.x = parseInt(e.offsetX) 
        mouseposition.y = parseInt(e.offsetY)
        
        //if action type is "move" we set the priorytiy item position to mouseposition
        if (actiontype == "move" && priorityitem)
        {
      
            priorityitem.setposition(mouseposition.x-moveshift.x, mouseposition.y-moveshift.y) 
       
            }
})



canvas.addEventListener("mouseup", (e) => {

    if (priorityitem)
    {
        if (actiontype == "move")
        {
            priorityitem=null
            }

        }
    if (actiontype == "addentity")
    {  
        e = new Entity(e.offsetX, e.offsetY)
    }

    else if (actiontype == "addrelation")
    {
        e = new Relation(e.offsetX, e.offsetY)
        
    }
    
    
})

//this function draw everything on the canvas
function drawall()
{

    connections.forEach(connection=>connection.draw())
    entities.forEach(entity=>entity.draw())

    relations.forEach(relation=>relation.draw())
}

//canvas animation function (this function update the canvas)
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)//we clean the canvas to update everything
    drawall()//we draw everythings
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

