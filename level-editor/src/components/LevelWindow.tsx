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
    height: '600px',
    minHeight:'600px',
    minWidth: '1200px',
    width: '1200px',
    float: 'left',
    color: '#000000',
    position: 'relative'
}

const LevelWindow : React.FC<Props> = ({backgroundPastPath, backgroundPresPath, gameObjectState,updateState}) => {
  const[gameObjects, setGameObjects] = useState(gameObjectState)
  let world = gameObjectState.world
  let platforms = gameObjectState.platforms
  let avatar = gameObjectState.avatar
  let door = gameObjectState.door
  let turrets = gameObjectState.turrets

  //takes an array representing a position in game coordinates and converts to array of pixel coordinates
  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1200 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }

  //takes an array representing a position in pixels and converts to array of game coordinates
  let pxToGameCoord = (px:Array<number>) => {
    return [px[0] * world.bounds[0] / 1200, px[1] * world.bounds[1] / 600]
  }
  let updatePos = (p:Array<number>, id:string) =>{
    pxToGameCoord(p)
    if(id == 'door'){
      // let { size, bodyType,density,friction,restitution,texturePres,texturePast } = gameObjectState.door
      door.pos = p
    } else if (id == 'avatar'){
      avatar.pos = p
    }
    let newGS = {
      world:world,
      platforms:platforms,
      avatar: avatar,
      door:door,
      turrets:turrets
    }
    console.log("levelwindow",newGS)
    setGameObjects(newGS)
    updateState(newGS)
       
  }

  let windowItems = [
    <LevelWindowItem key = {JSON.stringify(gameObjectState) + "door"} texturePres = {gameObjectState.door.texturePres} idInput = "door" posInput = {gameCoordToPx(gameObjectState.door.pos)} updatePosInput = {updatePos}></LevelWindowItem>,
    <LevelWindowItem key = {JSON.stringify(gameObjectState) + "avatar"} texturePres = {gameObjectState.avatar.texture} idInput = "avatar" posInput = {gameCoordToPx(gameObjectState.avatar.pos)} updatePosInput = {updatePos}></LevelWindowItem>
  ]

  return (
    <div className="LevelWindow" style = {windowStyling}>
      <img style = {{position:'absolute', top:'0px', left:'0px', height:'600px',width:'1200px', zIndex:-1}}src = {"/assets/"+ backgroundPastPath+".png"}></img>
      {windowItems}
    </div>
  );
}

export default LevelWindow;
