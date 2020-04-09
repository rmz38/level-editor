// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>

interface Props {
    debug: string;
}
const windowStyling : CSS.Properties= {
    height: '100%',
    width: '80%',
    background: '#ffffff',
    float: 'right',
    color: '#000000',
}

const LevelWindow : React.FC<Props> = ({debug}) => {
  
  return (
    <div className="LevelWindow" style = {windowStyling}>
      LevelWindow
      <Draggable onDrag = {(e,data) => console.log(data.x + " " + data.y)}>
        <div style = {{position:'absolute', left:'100px', top:'300'}}>item</div>
      </Draggable>
      {debug}
    </div>
  );
}

export default LevelWindow;
