// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import { url } from 'inspector';
import LevelWindowItem from './LevelWindowItem';
import Door from './Door';

// import avatar from "/assets/avatar.png"
interface Props {
    backgroundPastPath: string
    backgroundPresPath: string
    gameObjectState: any
    updateState: (s:any) => any
}

// 'url("/assets/past_room2.png")'
const windowStyling : CSS.Properties= {
    height: '100%',
    width: '80%',
    float: 'right',
    color: '#000000',
    position: 'relative'
}

const LevelWindow : React.FC<Props> = ({backgroundPastPath, backgroundPresPath, gameObjectState,updateState}) => {
  const[gameObjects, setGameObjects] = useState(gameObjectState)
  let updatePos = (p:Array<number>, id:string) =>{
  
      let newGS = {
        world:gameObjectState.world,
        platforms:[],
        walls:[],
        avatar: {},
        door:{pos:p,size: [1.92, 1.92],
          bodyType: 'static',
          density: 0.0,
          friction: 0.0,
          restitution: 0.0,
          texturePres: 'goaldoor.png',
          texturePast: 'goaldoorPast.png'},
        turrets:[]
      }
      console.log("levelwindow",newGS)
      setGameObjects(newGS)
      updateState(newGS)
      
    
  }
  return (
    <div className="LevelWindow" style = {windowStyling}>
      <img style = {{position:'absolute', top:'0px', left:'0px', height:'600px', zIndex:-1}}src = {"/assets/"+ backgroundPastPath}></img>
      <LevelWindowItem key = {JSON.stringify(gameObjectState)} texturePres = {gameObjectState.door.texturePres} idInput = "door" posInput = {gameObjectState.door.pos} updatePosInput = {updatePos}></LevelWindowItem>
    </div>
  );
}

export default LevelWindow;
