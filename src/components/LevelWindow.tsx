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
  let spikes = gameObjects.spikes
  let talls = gameObjects.talls
  let pillars = gameObjects.pillars
  let longcapsules = gameObjects.longcapsules
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
    } else if (id.includes('longcapsule')){
      for (let [key, value] of Object.entries(longcapsules)){
        if(key == id){
          console.log('long');
          longcapsules[key].pos = p;
        }
      }
    }else if (id.includes('capsule')){
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
    } else if (id.includes('spike')){
      for (let [key, value] of Object.entries(spikes)){
        if(key == id){
          spikes[key].pos = p;
        }
      }
    } else if (id.includes('tall')){
      for (let [key, value] of Object.entries(talls)){
        if(key == id){
          talls[key].pos = p;
        }
      }
    } else if (id.includes('pillar')){
      for (let [key, value] of Object.entries(pillars)){
        if(key == id){
          pillars[key].pos = p;
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
      enemies:enemies,
      spikes:spikes,
      pillars:pillars,
      talls:talls,
      longcapsules:longcapsules
    }
    setGameObjects(newGS)
    updateState(newGS)
  }
  let coords = {
    x1: 0,
    y1: 0,
    x2: 10,
    y2: 10
  }
  // rescale formular platform height =  .008 * 600/world.bounds[1]
  let windowItems = [
    <LevelWindowItem scaleX = {.03 * 1000/ world.bounds[0]} scaleY = {.03 * 600 / world.bounds[1]} centered = {true} key = {"door"} texturePres = {gameObjectState.door.texture} idInput = "door" posInput = {gameCoordToPx(gameObjectState.door.pos)} updatePosInput = {updatePos}></LevelWindowItem>,
    <LevelWindowItem scaleX = {.024 * 1000/ world.bounds[0]} scaleY = {.0225 * 600 / world.bounds[1]} centered = {true} key = {"avatar"} texturePres = {gameObjectState.avatar.texture} idInput = "avatar" posInput = {gameCoordToPx(gameObjectState.avatar.pos)} updatePosInput = {updatePos}></LevelWindowItem>
  ]
  for (let [key, value] of Object.entries(turrets)) {
    windowItems.push(<LevelWindowItem lineX1 = {turrets[key].pos[0] + turrets[key].direction[0]*20}  lineX2 = {turrets[key].pos[0]} lineY2 = {turrets[key].pos[1]} lineY1 = {turrets[key].pos[1] + turrets[key].direction[1] * 20} scaleX = {.024 * 1000/ world.bounds[0]} scaleY = {.0225 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {turrets[key].texture} idInput = {key} posInput = {gameCoordToPx(turrets[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
    // windowItems.push(<div style = {{zIndex:-1, position:'absolute' as 'absolute', left:gameCoordToPx(turrets[key].pos)[0], bottom:gameCoordToPx(turrets[key].pos)[1]}}><svg height = '60px' width = '160px'>
    //   <line x1 = {turrets[key].pos[0]} y1= {turrets[key].pos[1]} x2 = {turrets[key].pos[0] + turrets[key].direction[0] * 20} y2 = {turrets[key].pos[1] + turrets[key].direction[1]} stroke = "black" strokeWidth = '2'></line>
    // </svg></div>);
  }
  for (let [key, value] of Object.entries(capsules)) {
    windowItems.push(< LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {capsules[key].texture} idInput = {key} posInput = {gameCoordToPx(capsules[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(diamonds)) {
    windowItems.push(<LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {diamonds[key].texture} idInput = {key} posInput = {gameCoordToPx(diamonds[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(rounds)) {
    windowItems.push(<LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {rounds[key].texture} idInput = {key} posInput = {gameCoordToPx(rounds[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(enemies)) {
    windowItems.push(<LevelWindowItem scaleX = {.024 * 1000/ world.bounds[0]} scaleY = {.0225 * 600/world.bounds[1]} centered = {true} key = {key} texturePres = {enemies[key].texture} idInput = {key} posInput = {gameCoordToPx(enemies[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(spikes)) {
    windowItems.push(<LevelWindowItem scaleX = {.01 * 1000/ world.bounds[0]} scaleY = {.01 * 600/world.bounds[1]} centered = {true} key = {key} texturePres = {spikes[key].texture} idInput = {key} posInput = {gameCoordToPx(spikes[key].pos)} updatePosInput = {updatePos} angle = {spikes[key].angle}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(talls)) {
    windowItems.push(<LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {talls[key].texture} idInput = {key} posInput = {gameCoordToPx(talls[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(pillars)) {
    windowItems.push(<LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {pillars[key].texture} idInput = {key} posInput = {gameCoordToPx(pillars[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  for (let [key, value] of Object.entries(longcapsules)) {
    windowItems.push(<LevelWindowItem scaleX = {.008 * 1000/ world.bounds[0]} scaleY = {.0075 * 600/world.bounds[1]} centered = {false} key = {key} texturePres = {longcapsules[key].texture} idInput = {key} posInput = {gameCoordToPx(longcapsules[key].pos)} updatePosInput = {updatePos}></LevelWindowItem>);
  }
  return (
    <div className="LevelWindow" style = {windowStyling}>
      <img style = {{position:'absolute', top:'0px', left:'0px', height:'600px',width:'1000px', zIndex:-10}}src = {"./assets/"+ backgroundPastPath+".png"}></img>
      {windowItems}
    </div>
  );
}

export default LevelWindow;
