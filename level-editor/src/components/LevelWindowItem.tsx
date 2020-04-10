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
  const [height,setHeight] = useState(90)
  const [width,setWidth] = useState(90)
  let temp:any;
  // let pxToGameCoord = (px:Array<number>) => {
  //   return [px[0] * world.bounds[0] / 1200, px[1] * world.bounds[1] / 600]
  // }
  // let testheight:number | undefined= 90;
  // let wrap = (n:number) => {
  //   testheight = n
  // }
  return (
    // updatePosInput takes a list of the new position values (calculated by adding drag pos to current pos) and name of the component
    
    <div>
    <Draggable onStop = {(e,data) => updatePosInput([(posInput[0] + data.x),posInput[1] - data.y], idInput)}>
        <img ref = {el => temp = el} src = {"/assets/" + texturePres +".png"} style = {{position:'absolute', left:posInput[0] - width/2, bottom: posInput[1] - height/2 }}
          onLoad={(e) => {setWidth(temp.naturalWidth); setHeight(temp.naturalHeight); console.log(idInput + " " + temp.naturalHeight + " " + posInput[0])}}></img>
    </Draggable>
    {/* <Draggable onStop = {(e,data) => updatePosInput([(posInput[0] + data.x),posInput[1] - data.y], idInput)}>
        <img ref = {el => temp = el} src = {"/assets/" + texturePres +".png"} style = {{position:'absolute', left:posInput[0], bottom: posInput[1]}}
         ></img>
    </Draggable> */}
    </div>
  
  );
}

export default LevelWindowItem;