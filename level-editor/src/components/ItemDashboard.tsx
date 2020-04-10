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
  
  //updates in App the state assuming world was changed
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
  //updates Apps state assuming door was changed
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
  let updateAvatarState = (newAva:any) => {
    let {world, platforms, walls, door, turrets} = gameObjects
    let newGameObjects = {
      world:world,
      platforms:platforms,
      walls:walls,
      avatar:newAva,
      door:door,
      turrets:turrets,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }

  //list of components initially, will always have a door, world, and avatar, avatar not implemented yet
  const [componentList, setComponentList] = useState<any>([
    <World key = {JSON.stringify(gameObjects) + " world"} info = {gameObjects.world} update = {updateWorldState} selected = {selected}></World>,
    <Door key = {JSON.stringify(gameObjects) + " door"} info = {gameObjects.door} update = {updateDoorState} selected = {selected}></Door>,
    <Avatar key = {JSON.stringify(gameObjects) + " avatar"} info = {gameObjects.avatar} update = {updateAvatarState} selected = {selected}></Avatar>
    ]
    )
  
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        {componentList}

    </div>
  );
}

export default ItemDashboard;
