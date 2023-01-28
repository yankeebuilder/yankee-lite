
const mouseposition = {
    x: 0,
    y:0
}

dialogs.addEventListener('click', (e) => {
    e.target.classList.remove("active")
    e.target.innerHTML=''
})
actiontype="none"

var priorityitem=null
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "black";

var entities = [] 
var relations = []
var connections = []

class Item
{

    constructor(x, y)
    {
        this.x = x
        this.y = y
        this.selected=false
    }

    setposition(x, y)
    {
        this.x = x
        this.y = y
    }

    draw()
    {
        ctx.strokeStyle=(this.selected)?"rgb(34, 48, 255)":"black"
    }

    edit()
    {
        dialogs.classList.add("active")
    }

}


    
class Entity extends Item
{
    constructor(x,y)
    {
        super(x,y)
        this.name="entité "+entities.length
        entities.push(this)
        this.attributes = ["nom","prenom","age","numéro"]
        
        
        
    } 

    getsize() {
        return {w: 156, h:this.attributes.length*20 +60}
    }

    draw()
    {
        super.draw()
        
        ctx.beginPath()

        ctx.rect(this.x, this.y, 156, this.attributes.length*20 +60)
        ctx.rect(this.x, this.y, 156, 30)
        ctx.fillStyle="white"
        ctx.fill()
        ctx.fillStyle="black"
        ctx.font = "20px sans-serif";
        ctx.fillText(this.name, this.x + 40, this.y + 20); 
        
        this.attributes.forEach(attribute => {
            ctx.fillText(attribute, this.x + 30 , this.y + 50 + this.attributes.indexOf(attribute)*25); 
        });
        ctx.stroke();
    }
    edit()
    {
        super.edit()  
        

    }
}
    
class Relation extends Item
{
    constructor(x,y)
    {
       super(x,y)
        relations.push(this)
    }
    draw()
    {
        super.draw()
        ctx.beginPath()
        ctx.ellipse(this.x, this.y, 80, 30, 0, 0, 123)
        ctx.fillStyle="white"
        ctx.fill()
        ctx.stroke()
    }
    edit()
    {
        dialogs.innerHTML
        super.edit()  

   }
}

class Connection
{
    constructor(entity,relation)
    {
        this.relation = relation
        this.entity = entity
        this.type = "1,n"
        this.selected=false
        connections.push(this)
    }

    draw()
    {
        ctx.strokeStyle=(this.selected)?"rgb(34, 48, 255)":"black"
        if (!(this.relation && this.entity))
            ctx.strokeStyle = "green"
        else
            ctx.strokeStyle = "black"
        ctx.beginPath()
        if (this.entity && this.relation)
        {
            ctx.moveTo(this.entity.x + this.entity.getsize().w/2, this.entity.y + this.entity.getsize().h/2) 
            ctx.lineTo(this.relation.x, this.relation.y) 
            ctx.fillStyle="black"
            ctx.font = "20px Arial";
            ctx.fillText(this.type,((this.entity.x+this.relation.x)/2)+20,((this.entity.y+this.relation.y)/2)+30); 
        }
        else if (this.entity)
        {
            ctx.moveTo(this.entity.x + 80, this.entity.y + 100) 
            ctx.lineTo(mouseposition.x,mouseposition.y)
        }
        else
        {
            ctx.moveTo(this.relation.x, this.relation.y) 
            ctx.lineTo(mouseposition.x, mouseposition.y) 

        }
        

     
        ctx.stroke()


    }
    edit()
    {
    }

  

    remove()
    {
        connections.splice(connections.indexOf(this),1)
    }
}




canvas.addEventListener("mousedown",
    (e) => {
        actiontype = getaction()
        
        entities.forEach(item => item.selected = false)
        relations.forEach(item => item.selected = false)
        if (actiontype == "move")
        {
            item = entities.reverse().find(item => (( e.offsetX>=item.x && e.offsetX<=item.x+156) &&  e.offsetY>=item.y && e.offsetY<=item.y+200)) || relations.find(item => (( e.offsetX>=item.x-80 && e.offsetX<=item.x+80) &&  e.offsetY>=item.y-30 && e.offsetY<=item.y+30))
            if (item)
            {
                if (priorityitem)
                priorityitem.selected=false
                priorityitem = item
                priorityitem.selected=true
                console.log(true)
                actiontype="move"
            }
            entities.reverse()
        }


        else if (actiontype=="addconnection")
        {
            item = entities.find(item => (( e.offsetX>=item.x && e.offsetX<=item.x+item.getsize().w) &&  e.offsetY>=item.y && e.offsetY<=item.y+item.getsize().h)) || relations.find(item => (( e.offsetX>=item.x-80 && e.offsetX<=item.x+80) &&  e.offsetY>=item.y-30 && e.offsetY<=item.y+30))

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
                    console.log("yo")
                    if (item instanceof Entity)
                    {
                        if (priorityitem.entity)
                        {
                              newrelation= new Relation((priorityitem.entity.x+item.x+item.getsize().w/2+priorityitem.entity.getsize().w/2)/2, (priorityitem.entity.y+item.y+item.getsize().h/2+priorityitem.entity.getsize().h/2)/2)
                            priorityitem.relation = newrelation
                            new Connection(item,newrelation)
                        }
                        else
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

        console.log(e.offsetX,e.offsetY)
        
    })

    canvas.addEventListener("dblclick",
    (e) => {
        item = entities.reverse().find(item => (( e.offsetX>=item.x && e.offsetX<=item.x+156) &&  e.offsetY>=item.y && e.offsetY<=item.y+200)) || relations.find(item => (( e.offsetX>=item.x-80 && e.offsetX<=item.x+80) &&  e.offsetY>=item.y-30 && e.offsetY<=item.y+30))
        

        if (item)
        {
            if (actiontype=="move")
           item.edit()
            }

        
        console.log(e.offsetX,e.offsetY)
        
    })

canvas.addEventListener("mousemove",
    (e) => {
        mouseposition.x = e.offsetX
        mouseposition.y=e.offsetY
        if (actiontype == "move" && priorityitem)
        {
            priorityitem.setposition(e.offsetX, e.offsetY)
            console.log(priorityitem.selected)
            
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
    {    console.log(actiontype)
        e = new Entity(e.offsetX, e.offsetY)
        console.log(e.offsetX, e.offsetY)
    }

    else if (actiontype == "addrelation")
    {
        e = new Relation(e.offsetX, e.offsetY)
        
    }
    
    
})

function drawall()
{

    for (i in connections)
    {
        connections[i].draw()
    }
    for (i in entities)
    {
        entities[i].draw()
    }

    for (i in relations)
    {
     relations[i].draw()
    }

}



function loop() {

    console.log(mouseposition.x,mouseposition.y)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawall()

  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

