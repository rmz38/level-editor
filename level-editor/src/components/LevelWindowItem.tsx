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
    centered:boolean
    scaleY: number
    scaleX: number
}

// 'url("/assets/past_room2.png")'

const LevelWindowItem : React.FC<Props> = ({texturePres,texturePast,idInput,posInput,updatePosInput, centered, scaleY, scaleX}) => {
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
    // .008 * 600/18
    <div>
    <Draggable onStop = {(e,data) => updatePosInput([(posInput[0] + data.x),posInput[1] - data.y], idInput)}>
        <img ref = {el => temp = el} src = {"./assets/" + texturePres +".png"} style = {{width: width * scaleX, height: height * scaleY +'px', position:'absolute', left:centered ? posInput[0] - width*scaleX/2 : posInput[0], bottom:centered ? posInput[1] - height*scaleY/2 : posInput[1]}}
          onLoad={(e) => {setWidth(temp.naturalWidth); setHeight(temp.naturalHeight);}}></img>
    </Draggable>
    {/* <Draggable onStop = {(e,data) => updatePosInput([(posInput[0] + data.x),posInput[1] - data.y], idInput)}>
        <img ref = {el => temp = el} src = {"/assets/" + texturePres +".png"} style = {{position:'absolute', left:posInput[0], bottom: posInput[1]}}
         ></img>
    </Draggable> */}
    </div>
  
  );
}

export default LevelWindowItem;