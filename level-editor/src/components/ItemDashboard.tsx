// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
// import GameObject  from './GameObject';
import Turret from './Turret';
import World from './World';
import Door from './Door';

interface Props {
    gameObjectsInput: any;
    update: (data:any) => void;
    selected: (id:string, open:boolean) => void;
}

// interface GameObjectType{
//   name: string,
//   jsonitem: Object
// }
const objectTypes = ['world', 'turret']
const windowStyling : CSS.Properties= {
    height: '100%',
    width: '20%',
    background: '#aaaaaa',
    display: 'inline-block',
    float: 'right',
    overflow: 'scroll'
}
// function createTurret(p:Array<number>){
//   return <Turret pos = {p} updatefn = {updateTurret}></Turret>;
// }

const ItemDashboard : React.FC<Props> = ({gameObjectsInput, update, selected}) => {
  const [gameObjects, setGameObjects] = useState<any>(JSON.parse(JSON.stringify(gameObjectsInput)));
  
  let updateWorldState = (newWorld:any) => {
    let {platforms, walls, avatar, door, turrets} = gameObjects
    let newGameObjects = {
      world:newWorld,
      platforms:platforms,
      walls:walls,
      avatar:avatar,
      door:door,
      turrets:turrets,
    }
    update(newGameObjects);
    setGameObjects(newGameObjects)
  }
  let updateDoorState = (newDoor:any) => {
    let {world, platforms, walls, avatar, turrets} = gameObjects
    let newGameObjects = {
      world:world,
      platforms:platforms,
      walls:walls,
      avatar:avatar,
      door:newDoor,
      turrets:turrets,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  const [componentList, setComponentList] = useState<any>([
    <World key = {JSON.stringify(gameObjects)} info = {gameObjects.world} update = {updateWorldState} selected = {selected}></World>,
    <Door key = {JSON.stringify(gameObjects)} info = {gameObjects.door} update = {updateDoorState} selected = {selected}></Door>]
    )
  // gravity: -9.8,
  //   bounds: [0.0,0.0,2.0,3.0],
  //   scale: [2.0,3.0],
  //   backgroundPres: 'present',
  //   backgroundPast: 'past'
  // const{ gravity, bounds, scale, backgroundPres, backgroundPast} = gameObjects.world
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        {componentList}

    </div>
  );
}

export default ItemDashboard;
