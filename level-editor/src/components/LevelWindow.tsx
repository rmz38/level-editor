// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import { url } from 'inspector';

// import avatar from "/assets/avatar.png"
// interface Props {
//     debug: string;
// }

// 'url("/assets/past_room2.png")'
const windowStyling : CSS.Properties= {
    height: '100%',
    width: '80%',
    float: 'right',
    color: '#000000',
    position: 'relative'
}

const LevelWindow : React.FC = () => {
  
  return (
    <div className="LevelWindow" style = {windowStyling}>
      <img style = {{position:'absolute', top:'0px', left:'0px', height:'600px'}}src = "/assets/past_room2.png"></img>
        LevelWindow
        <Draggable onDrag = {(e,data) => console.log(data.x + " " + data.y)}>
          <div style = {{position:'absolute', bottom:'0px', left:'0px'}}><img src = "/assets/goaldoor.png"></img></div>
        </Draggable>
    </div>
  );
}

export default LevelWindow;
