
import React from 'react';
class ProjectToolbar extends React.Component
{
    render() {
        return (
            <div class="toolbar">
            <div class="tools">
                <button class="active" data-action="move"><img  src="assets/cursor.png" alt=""/> move</button>
                <button data-action="addentity"> <img src="assets/entity.png" alt=""/> entity</button>
                <button data-action="addrelation"><img src="assets/relation.png" alt=""/> relation</button>
                <button data-action="addconnection"> <img src="assets/connection.png" alt=""/>connection</button>
            </div>
    
             <div class="sp">
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
    
    }

  class Projects extends React.Component {
    render() {
        return (
<div class="project">
    
<ProjectToolbar />
    
    <div class="model">

        <canvas width="1200px" height="2000px">

        </canvas>
    </div>
</div>
      );
    }
  }



  export default Projects