

const electron = window.require('electron');
const { ipcMain,ipcRenderer ,dialog,BrowserWindow} = electron;


export const onnewdiagram = (callback) =>
{
    ipcRenderer.once("newdiagram", (e, args) =>
{
    callback()
})
}

interface DMitem
{
  entities: Any[];
  relations: Any[];
  connections: Any[]
       }

      interface diagram{
  id:Number;
        location: String;
        items: DMitem
      }
       


ipcRenderer.on("saveas", () =>
{

    ipcRenderer.send("save", window.currentdiagram)
    
  
})


export function onopen(callback)
{
    ipcRenderer.once("open", (e,args) => {

callback(args)
    })
}


export const onsaved = (callback) => {
    ipcRenderer.once("saved", (e, args) =>
    {
        callback(args)
})

}


    
