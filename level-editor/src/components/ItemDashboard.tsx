// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
// import GameObject  from './GameObject';
import Turret from './Turret';
import World from './World';
import Door from './Door';
import Avatar from './Avatar';

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
    width: '100%',
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
  let {avatar, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
  //updates in App the state assuming world was changed
  let updateWorldState = (newWorld:any) => {
    
    let newGameObjects = {
      world:newWorld,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
    }
    update(newGameObjects);
    setGameObjects(newGameObjects)
  }
  //updates Apps state assuming door was changed
  let updateDoorState = (newDoor:any) => {
    let {world, avatar, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:newDoor,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  //updates Apps state assuming avatar was changed
  let updateAvatarState = (newAva:any) => {
    let {world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newGameObjects = {
      world:world,
      avatar:newAva,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateTurretState = (newTurr:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newTurrets = turrets;
    for (let [key, value] of Object.entries(turrets)) {
      if(key == id){
        newTurrets[key] = newTurr;
        break;
      }
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:newTurrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  

  //list of components initially, will always have a door, world, and avatar, avatar not implemented yet
  const [componentList, setComponentList] = useState<any>([
    <World key = {JSON.stringify(gameObjects) + " world"} info = {gameObjects.world} update = {updateWorldState} selected = {selected}></World>,
    <Door key = {JSON.stringify(gameObjects) + " door"} info = {gameObjects.door} update = {updateDoorState} selected = {selected}></Door>,
    <Avatar key = {JSON.stringify(gameObjects) + " avatar"} info = {gameObjects.avatar} update = {updateAvatarState} selected = {selected}></Avatar>,
    ]
    )
  let components = componentList;
  for (let [key, value] of Object.entries(gameObjects.turrets)) {
    components.push(<Turret key = {JSON.stringify(gameObjects) + key} info = {value} id = {key} update = {updateTurretState} selected = {selected}></Turret>);
  }
  // <Turret key = {JSON.stringify(gameObjects) + 'turret'} info = {gameObjects.turrets.turret1} id = 'turret1' update = {updateTurretState} selected = {selected}></Turret>
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        {components}

    </div>
  );
}

export default ItemDashboard;
