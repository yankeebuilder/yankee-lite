/*Copyrights for code authored by elodream Inc. is licensed under the following terms:
MIT License
Copyright  2023 Yahoo Inc.
*/

const { app, BrowserWindow, Menu,shell } = require('electron')

const fs = require("fs")
const path =require("path");
const { title } = require('process');



const isMac = process.platform === 'darwin'
const startUrl = process.env.ELECTRON_START_URL || url.format({ pathname: path.join(__dirname, '../index.html'),        protocol: 'file:',        slashes: true,    });


const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),

  {
    label: 'File',
    submenu: [
      {
        label: 'new diagram',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      },
      {
        label: 'new project',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      },
      {
        label: 'new window',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      },
      {role: 'sepparator'},
      {
        label: 'open file',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      },
      { label: 'recents' },
      { type:'separator'},
      {
        label: 'save',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
      },
      {
        label: 'save as',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
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
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
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


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "public/logo.png",
    title:"tankee"
  })

  win.maximize()

  win.loadURL(startUrl);
  win.setOverlayIcon('publix/logo.png', 'yankee ')
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