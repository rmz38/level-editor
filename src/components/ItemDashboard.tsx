// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
// import GameObject  from './GameObject';
import Turret from './Turret';
import World from './World';
import Door from './Door';
import Avatar from './Avatar';
import Capsule from './Capsule';
import Diamond from './Diamond';
import Round from './Round';
import Enemy from './Enemy';
import AddButton from './AddButton';
import { uuid } from 'uuidv4';

interface Props {
    gameObjectsInput: any;
    update: (data:any) => void
    selected: (id:string, open:boolean) => void
    numPlat: number
    numEnemy: number
    updateNumPlatApp: (n:number) => void
    updateNumEnemyApp: (n:number) => void
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

const ItemDashboard : React.FC<Props> = ({gameObjectsInput, update, selected, numPlat, updateNumPlatApp, numEnemy, updateNumEnemyApp}) => {
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
    let add = true;
    if( newTurr == 'delete'){
      delete newTurrets[id]
    }else {
      for (let [key, value] of Object.entries(turrets)) {
        if(key == id){
          newTurrets[key] = newTurr;
          add = false;
          break;
        }
      }
      if(add){id = id + (numEnemy + 1); updateNumEnemy(numEnemy + 1); newTurrets[id] = newTurr}
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

  let updateCapsuleState = (newCap:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newCapsules = capsules;
    let add = true;
    if(newCap == 'delete'){
      delete newCapsules[id]
    } else {
      for (let [key, value] of Object.entries(capsules)) {
        if(key == id){
          newCapsules[key] = newCap;
          add = false;
          break;
        }
      }
      if(add){newCapsules[id] = newCap}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:newCapsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateDiamondState = (newDia:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newDiamonds = diamonds;
    let add = true;
    if(newDia == 'delete'){
      delete newDiamonds[id]
    } else {
      for (let [key, value] of Object.entries(diamonds)) {
        if(key == id){
          newDiamonds[key] = newDia;
          add = false;
          console.log("newDiaID", id)
          break;
        }
      }
      if(add){
        newDiamonds[id] = newDia
      }
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:newDiamonds,
      rounds:rounds,
      enemies:enemies,
    }
    console.log("debugging new diamond platform", newGameObjects)
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateRoundState = (newRound:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newRounds = rounds;
    let add = true;
    if (newRound == 'delete'){
      delete newRounds[id]
    }else{
      for (let [key, value] of Object.entries(rounds)) {
        if(key == id){
          newRounds[key] = newRound;
          add = false;
          break;
        }
      }
      if(add){newRounds[id] = newRound}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:newRounds,
      enemies:enemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateEnemyState = (newEnemy:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    let newEnemies = enemies;
    let add = true;
    if (newEnemy == 'delete'){
      delete newEnemies[id]
    }else{
      for (let [key, value] of Object.entries(rounds)) {
        if(key == id){
          newEnemies[key] = newEnemy;
          add = false;
          break;
        }
      }
      if(add){id = id + (numEnemy + 1); updateNumEnemy(numEnemy + 1); newEnemies[id] = newEnemy}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:newEnemies,
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let addPlatform = (newPlatform:any, id:string, type:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
    if( type == 'round'){
      updateRoundState(newPlatform, id +(numPlat + 1))
    } else if (type == 'diamond'){
      updateDiamondState(newPlatform, id  + (numPlat + 1))
    } else {
      updateCapsuleState(newPlatform, id  + (numPlat + 1))
    }
  }
  let updateNumPlat = (n:number) => {
    updateNumPlatApp(n);
  }
  let updateNumEnemy = (n:number) => {
    updateNumEnemyApp(n);
  }
  //list of components initially, will always have a door, world, and avatar, avatar not implemented yet
  const [componentList, setComponentList] = useState<any>([
    <AddButton updateNumPlat = {updateNumPlat} numPlat = {numPlat} key = {'add'} gameObjects ={gameObjects} updateEnemy = {updateEnemyState} updateTurret = {updateTurretState} updatePlatform ={addPlatform}></AddButton>,
    <World key = {JSON.stringify(gameObjects) + " world"} info = {gameObjects.world} update = {updateWorldState} selected = {selected}></World>,
    <Door key = {JSON.stringify(gameObjects) + " door"} info = {gameObjects.door} update = {updateDoorState} selected = {selected}></Door>,
    <Avatar key = {JSON.stringify(gameObjects) + " avatar"} info = {gameObjects.avatar} update = {updateAvatarState} selected = {selected}></Avatar>,
    ]
    )
  let components = componentList;
  for (let [key, value] of Object.entries(gameObjects.turrets)) {
    components.push(<Turret key = {key} info = {value} id = {key} update = {updateTurretState} selected = {selected}></Turret>);
  }
  for (let [key, value] of Object.entries(gameObjects.capsules)) {
    components.push(<Capsule key = {key + Math.random()} info = {value} id = {key} update = {updateCapsuleState} selected = {selected}></Capsule>);
  }
  for (let [key, value] of Object.entries(gameObjects.diamonds)) {
    components.push(<Diamond key = {key + Math.random()} info = {value} id = {key} update = {updateDiamondState} selected = {selected}></Diamond>);
  }
  for (let [key, value] of Object.entries(gameObjects.rounds)) {
    components.push(<Round key = {key + Math.random()} info = {value} id = {key} update = {updateRoundState} selected = {selected}></Round>);
  }
  for (let [key, value] of Object.entries(gameObjects.enemies)) {
    components.push(<Enemy key = {key} info = {value} id = {key} update = {updateEnemyState} selected = {selected}></Enemy>);
  }
  // <Turret key = {JSON.stringify(gameObjects) + 'turret'} info = {gameObjects.turrets.turret1} id = 'turret1' update = {updateTurretState} selected = {selected}></Turret>
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        {components}

    </div>
  );
}

export default ItemDashboard;
