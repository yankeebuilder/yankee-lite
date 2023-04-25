/*Copyrights for code authored by elodream Inc. is licensed under the following terms:
MIT License
Copyright  2023 Yahoo Inc.
*/

const { click } = require('@testing-library/user-event/dist/click');
const { app, BrowserWindow, Menu,shell, ipcMain, ipcRenderer, dialog } = require('electron')

const fs = require("fs")
const path =require("path");
const { title } = require('process');



const isMac = process.platform === 'darwin'
const startUrl = process.env.ELECTRON_START_URL || url.format({ pathname: path.join(__dirname, '../index.html'),        protocol: 'file:',        slashes: true,    });





const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "public/logo.png",
    title:"yankee",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
  
    },
  })

  win.webContents.openDevTools()
  win.maximize()

  win.loadURL(startUrl);
  win.setOverlayIcon('public/logo.png', 'yankee ')

  const template = [


    {
      label: 'File',
      submenu: [
        {
          label: 'new diagram',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click:()=>
          {
            win.webContents.send("newdiagram")
  
          }
        },
  
        {
          label: 'new window',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
        },
        {role: 'sepparator'},
        {
          label: 'open file',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click: () =>
          {
            open()
                     }

        },
        { label: 'recents' },
        { type:'separator'},
        {
          label: 'save',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click:()=>
          {
            win.webContents.send("save")
  
          }
        },
        {
          label: 'save as',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
          click:()=>
          {
           
            win.webContents.send("saveas")
  
          }
        },
        {type:'separator'},
  
        isMac ? {
          role: 'close'} : { role: 'quit' },
   
      ]
    },
  
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' }
        ])
      ]
    },
  
    {
      role: 'help',
      submenu: [
        {
          label: 'read the docs',
          click: async () => {
     
            await shell.openExternal('https://electronjs.org')
          }
        },
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://electronjs.org')
          }
        },
        {type:'separator'},
        {
          label: 'make a donation',
          click: async () => {
            await shell.openExternal('https://electronjs.org')
          }
        },
  
        {
          label: 'contribute to the project',
          click: async () => {
            await shell.openExternal('https://github.com/yankeebuilder/yankee#readme')
          }
        }
      ]
    }


  ]

  function open(path)
  {
    var diagram = new Object()
    var items = {entities:[],relations:[],connections:[]}
    diagram.location = ''
    diagram.id = 1
    diagram.items=items
    
    console.log(diagram)

    win.webContents.send("open",diagram)
  
  }


function save(d,path)
{
    var data=""
    d.items.entities.forEach(entity => {
        
       data += `${entity.x}-${entity.y},`
    })
  data += '\n'
  d.items.relations.forEach(i => {
        
    data += `${i.x}-${i.y},`
 })
data+='\n'
 return data
}
  
  
  ipcMain.on("save", (e, args) =>
  {

  
    let defaultpath=(args.location)?`untiled ${args.location}`:args.location

    var options = {
     
            //Placeholder 1
            title: "Save file - Electron example",
            
            //Placeholder 2
        defaultPath: defaultpath,
            
            
            //Placeholder 4
            buttonLabel : "Save your diagram File",
            
            //Placeholder 3
            filters :[
             {name: 'yankee file', extensions: ['yankee', 'yan']},

            ]
           }
    
     dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), options).then(location =>
     {
       fs.writeFileSync(location.filePath,save(args, location.filePath))
      
       
    e.reply("saved", [args.id,location])  
  
      })

  })
    
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}





//app configuration 

// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: '--new-window',
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: 'yankee',
//     description: 'modeling app'
//   }
// ])



app.whenReady().then(() => {


  createWindow()
})