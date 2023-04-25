
import React, { useEffect, useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Canvas from './projectcanvas';
import entityimg from '../../assets/entity.png'
import relationimg from '../../assets/relation.png'
import connectionimg from '../../assets/connection.png'
import cursorimg from '../../assets/cursor.png'
import '../../renderer'
import { onnewdiagram, onopen, onsaved } from '../../renderer';
import { styled } from '@mui/material';
const electron = window.require('electron');
const { ipcMain,ipcRenderer ,dialog,BrowserWindow} = electron;



interface projecttoolProps {
  setoption:any ;
  option: string;
}

function ProjectToolbar(props:projecttoolProps) 
{
 const {setoption,option}=props
    
        return (
            <div className="toolbar">
            <div className="tools">
                <button className={(option == "move")?"active":undefined} onClick={()=>setoption("move")}><img  src={cursorimg} alt=""/> move</button>
              <button className={(option == "addentity") ? "active" : undefined} onClick={() => setoption("addentity")}> <img src={ entityimg} alt=""/> entity</button>
                <button className={(option == "addrelation")?"active":undefined} onClick={()=>setoption("addrelation")}><img src={relationimg} alt=""/> relation</button>
              <button className={(option == "addconnection") ? "active" : undefined} onClick={() => setoption("addconnection")}> <img src={connectionimg} alt=""/>connection</button>
            </div>
    
             <div className="sp">
                <button id="photo">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/></svg>
                </button>
                <button id="check">
                    <svg xmlns="http://www.w3.org/2000/svg"  width="20px" viewBox="0 0 512 512"><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </button>
                <button id="remove">
                    <svg xmlns="http://www.w3.org/2000/svg"   width="20px" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </button>
            </div>
        </div>
        )
    
    
}




function Project ()
{

  const [option, setoption] = useState("move") 
  
    
        return (
            <div className="project">
            <ProjectToolbar setoption={setoption} option={option} />
    <div className="model">
              <Canvas actiontype={option} />
            </div>
</div>
        )
    }



    interface TabPanelProps {
        children?: React.ReactNode;
        index: Number;
        value: Number;
      }
      
      function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            style={{height:"calc(100% - 48px)"}}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
          
                children
          
            )}
          </div>
        );
      }


      
      function a11yProps(index: number) {
        return {
          id: `project-tab-${index}`,
          'aria-controls': `project-tabpanel-${index}`,
        };
      }
      
      declare global {
        interface Window { currentdiagram: diagram | undefined; }

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
       
var o;
       function Projects() {
         const [value, setValue] = React.useState(0);
         const [diagrams,setdiagrams]=React.useState(Array<diagram>(0))
         const handleChange = (event: React.SyntheticEvent, newValue: number) => {
          setValue(newValue);

          window.currentdiagram=diagrams.find(d => d.id === newValue)

         };
         onnewdiagram(() => {
           var newdiagram = {
             location: '',
             id: (diagrams[diagrams.length - 1]) ? diagrams[diagrams.length - 1].id + 1 : 0,
             
             items: {
               entities: [],
               relations: [],
               connections: []
             }
           }
           setdiagrams([...diagrams, newdiagram])
           setValue(newdiagram.id)
           window.currentdiagram = newdiagram


         })

         
         
         interface StyledTabProps {
           id: string;
           label: string;
        }
        
        const StyledTab = styled((props: StyledTabProps) => (
          <Tab disableRipple {...props} />
        ))(({ theme }) => ({
          textTransform: 'none',
          fontWeight: theme.typography.fontWeightRegular,
          fontSize: theme.typography.pxToRem(15),
          marginRight: theme.spacing(1),
          color: 'rgba(255, 255, 255, 0.7)',
          '&.Mui-selected': {
            color: 'rgb(100, 95, 250)',
            backgroundColor:"#000"
          },
          '&.Mui-focusVisible': {
            backgroundColor: 'rgba(100, 95, 228, 0.32)',
          },
        }));
        
         o=diagrams
         function upd(args)
         {

           const newdiagrams = [...o];
            var  diagram = newdiagrams.find(
              a => a.id === args[0]
            )
           
           console.log(args)
          
           console.log(args[1].filePath)
           console.log("view",args[0])
           diagram.location = args[1].filePath;
           console.log(diagrams)
          setdiagrams(newdiagrams);
  
 
         }


         onsaved(upd)

         onopen((diagram) =>
         {
  
          diagram.id= (diagrams[diagrams.length - 1]) ? diagrams[diagrams.length - 1].id + 1 : 0
          const newdiagrams = [...o,diagram];
           setdiagrams(newdiagrams)
           window.currentdiagram = diagram

           setValue(diagram.id)
           console.log([...o, diagram])


           
         })






         


         return (
          <div className='projects'>
             <Tabs sx={{ paddingLeft: "150px", height: 48 }} value={value} textColor="secondary" onChange={handleChange} aria-label="projects tabs">
               
               {diagrams.map(d => {
                  console.log(d.id)
                 let name=(!d.location)?`untiled ${d.id}`:d.location
                 return (<StyledTab label={name} {...a11yProps(d.id)} />)
               }
               )}
   
             </Tabs>
             
             {diagrams.map(d => {
                                 console.log(d.id)


              
return (             <TabPanel  value={value} index={d.id}>
  <Project />
</TabPanel>)
             }
               
)}
          </div>
        );
      }
          


  export default Projects