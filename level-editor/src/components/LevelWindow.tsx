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
    minWidth: '1000px',
    width: '1200px',
    float: 'left',
    color: '#000000',
    position: 'relative'
}

const LevelWindow : React.FC<Props> = ({backgroundPastPath, backgroundPresPath, gameObjectState,updateState}) => {
  const[gameObjects, setGameObjects] = useState(gameObjectState)
  let world = gameObjectState.world
  let avatar = gameObjectState.avatar
  let door = gameObjectState.door
  let turrets = gameObjectState.turrets
  let capsules = gameObjects.capsules
  let diamonds = gameObjects.diamonds
  let rounds = gameObjects.rounds
  let enemies = gameObjects.enemies

  //takes an array representing a position in game coordinates and converts to array of pixel coordinates
  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1000 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }

  //takes an array representing a position in pixels and converts to array of game coordinates
  let pxToGameCoord = (px:Array<number>) => {
    return [px[0] * world.bounds[0] / 1000, px[1] * world.bounds[1] / 600]
  }
  let updatePos = (p:Array<number>, id:string) =>{
    p = pxToGameCoord(p)
    if(id == 'door'){
      // let { size, bodyType,density,friction,restitution,texturePres,texturePast } = gameObjectState.door
      door.pos = p
    } else if (id == 'avatar'){
      avatar.pos = p
    } else if (id.includes('turret')){
      for (let [key, value] of Object.entries(turrets)){
        if(key == id){
          turrets[key].pos = p;
        }
      }
    } else if (id.includes('diamond')){
      for (let [key, value] of Object.entries(diamonds)){
        if(key == id){
          diamonds[key].pos = p;
        }
      }
    } else if (id.includes('round')){
      for (let [key, value] of Object.entries(rounds)){
        if(key == id){
          rounds[key].pos = p;
        }
      }
    } else if (id.includes('capsule')){
      for (let [key, value] of Object.entries(capsules)){
        if(key == id){
          capsules[key].pos = p;
        }
      }
    } else if (id.includes('enemy')){
      for (let [key, value] of Object.entries(enemies)){
        if(key == id){
          enemies[key].pos = p;
        }
      }
    }
    let newGS = {
      world:world,
      avatar: avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies
    }
    console.log("levelwindow",newGS)
    setGameObjects(newGS)
    updateState(newGS)
       
  }

  let windowItems = [
    <LevelWindowItem centered = {true} key = {"door"} texturePres = {gameObjectState.door.texturePres} idInput = "door" posInput = {gameCoordToPx(gameObjectState.door.pos)} updatePosInput = {updatePos}></LevelWindowItem>,
    <LevelWindowItem centered = {true} key = {"avatar"} texturePres = {gameObjectState.avatar.texture} idInput = "avatar" posInput = {gameCoordToPx(gameObjectState.avatar.pos)} updatePosInput = {updatePos}></LevelWindowItem>
  ]
  for (let [key, value] of Object.entries(turrets)) {
    windowItems.push(<LevelWindowItem  centered = {false} key = {key} texturePres = {turrets[key].texture} idInput = {key} posInput = {gameCoordToPx(turrets[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(capsules)) {
    windowItems.push(< LevelWindowItem  centered = {false} key = {key} texturePres = {capsules[key].texture} idInput = {key} posInput = {gameCoordToPx(capsules[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(diamonds)) {
    windowItems.push(<LevelWindowItem centered = {false} key = {key} texturePres = {diamonds[key].texture} idInput = {key} posInput = {gameCoordToPx(diamonds[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(rounds)) {
    windowItems.push(<LevelWindowItem centered = {false} key = {key} texturePres = {rounds[key].texture} idInput = {key} posInput = {gameCoordToPx(rounds[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  return (
    <div className="LevelWindow" style = {windowStyling}>
      <img style = {{position:'absolute', top:'0px', left:'0px', height:'600px',width:'1000px', zIndex:-1}}src = {"/assets/"+ backgroundPastPath+".png"}></img>
      {windowItems}
    </div>
  );
}

export default LevelWindow;
