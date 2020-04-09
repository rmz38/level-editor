// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import { url } from 'inspector';

// import avatar from "/assets/avatar.png"
interface Props {
    texturePres?: string
    texturePast?: string
    idInput: string
    posInput: Array<number>
    updatePosInput: (a:Array<number>, idUpdate:string) => void
}

// 'url("/assets/past_room2.png")'

const LevelWindowItem : React.FC<Props> = ({texturePres,texturePast,idInput,posInput,updatePosInput}) => {
  const [id, setId] = useState<string>(idInput);
  return (
    // updatePosInput takes a list of the new position values (calculated by adding drag pos to current pos) and name of the component
    <Draggable onStop = {(e,data) => updatePosInput([posInput[0] + data.x,posInput[1] + data.y], 'door')}>
        <div style = {{position:'absolute', left:posInput[0], bottom:posInput[1], }}><img src = {"/assets/" + texturePres}></img></div>
    </Draggable>
  
  );
}

export default LevelWindowItem;