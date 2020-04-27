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
import Spike from './Spike';
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
  console.log("init game objects", gameObjects)
  let {world, avatar, door, turrets, diamonds, rounds, enemies, capsules, spikes, talls, longcapsules, pillars} = gameObjects
  console.log("init spikes", spikes)
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
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects);
    setGameObjects(newGameObjects)
  }
  //updates Apps state assuming door was changed
  let updateDoorState = (newDoor:any) => {
    let {world, avatar, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:newDoor,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  //updates Apps state assuming avatar was changed
  let updateAvatarState = (newAva:any) => {
    let {world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
    let newGameObjects = {
      world:world,
      avatar:newAva,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateTurretState = (newTurr:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
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
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }

  let updateCapsuleState = (newCap:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
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
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateDiamondState = (newDia:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
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
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    console.log("debugging new diamond platform", newGameObjects)
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateRoundState = (newRound:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
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
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateTallState = (newTall:any, id:string) => {
    let newTalls = talls;
    let add = true;
    if (newTall == 'delete'){
      delete newTalls[id]
    }else{
      for (let [key, value] of Object.entries(talls)) {
        if(key === id){
          newTalls[key] = newTall;
          add = false;
          break;
        }
      }
      if(add){newTalls[id] = newTall}
    }
    console.log(newTalls);
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:spikes,
      talls:newTalls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateLongcapsuleState = (newLongcapsule:any, id:string) => {
    let newLongcapsules = longcapsules;
    let add = true;
    if (newLongcapsule ==='delete'){
      delete newLongcapsules[id]
    }else{
      for (let [key, value] of Object.entries(talls)) {
        if(key === id){
          newLongcapsules[key] = newLongcapsule;
          add = false;
          break;
        }
      }
      if(add){newLongcapsules[id] = newLongcapsule}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:spikes,
      talls:talls,
      longcapsules:newLongcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updatePillarState = (newPillar:any, id:string) => {
    let newPillars = pillars;
    let add = true;
    if (newPillar == 'delete'){
      delete newPillars[id]
    }else{
      for (let [key, value] of Object.entries(talls)) {
        if(key === id){
          newPillars[key] = newPillar;
          add = false;
          break;
        }
      }
      if(add){newPillars[id] = newPillar}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:newPillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let updateEnemyState = (newEnemy:any, id:string) => {
    let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules, spikes} = gameObjects
    let newEnemies = enemies;
    let add = true;
    if (newEnemy == 'delete'){
      delete newEnemies[id]
    }else{
      for (let [key, value] of Object.entries(enemies)) {
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
      spikes: spikes,
      talls:talls,
      longcapsules:longcapsules,
      pillars:pillars
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  let addPlatform = (newPlatform:any, id:string, type:string) => {
    if( type === 'round'){
      updateRoundState(newPlatform, id +(numPlat + 1))
    } else if (type === 'diamond'){
      updateDiamondState(newPlatform, id  + (numPlat + 1))
    } else if (type === 'capsule') {
      updateCapsuleState(newPlatform, id  + (numPlat + 1))
    } else if (type === 'longcapsule') {
      updateLongcapsuleState(newPlatform, id  + (numPlat + 1))
    } else if (type === 'tall'){
      updateTallState(newPlatform, id  + (numPlat + 1))
    } else if (type === 'pillar'){
      updatePillarState(newPlatform, id  + (numPlat + 1))
    }
  }
  let updateNumPlat = (n:number) => {
    updateNumPlatApp(n);
  }
  let updateNumEnemy = (n:number) => {
    updateNumEnemyApp(n);
  }
  let updateSpikeState = (newSpike:any, id:string) => {
    console.log("currspikes", gameObjects);
    let newSpikes = spikes;
    let add = true;
    if (newSpike == 'delete'){
      delete newSpikes[id]
    }else{
      for (let [key, value] of Object.entries(spikes)) {
        if(key == id){
          newSpikes[key] = newSpike;
          add = false;
          break;
        }
      }
      if(add){id = id + Object.keys(spikes).length; newSpikes[id] = newSpike}
    }
    let newGameObjects = {
      world:world,
      avatar:avatar,
      door:door,
      turrets:turrets,
      capsules:capsules,
      diamonds:diamonds,
      rounds:rounds,
      enemies:enemies,
      spikes:newSpikes
    }
    update(newGameObjects)
    setGameObjects(newGameObjects)
  }
  //list of components initially, will always have a door, world, and avatar, avatar not implemented yet
  const [componentList, setComponentList] = useState<any>([
    <AddButton updateSpike = {updateSpikeState} updateNumPlat = {updateNumPlat} numPlat = {numPlat} key = {'add'} gameObjects ={gameObjects} updateEnemy = {updateEnemyState} updateTurret = {updateTurretState} updatePlatform ={addPlatform}></AddButton>,
    <World key = {JSON.stringify(gameObjects) + " world"} info = {gameObjects.world} update = {updateWorldState} selected = {selected}></World>,
    <Door world = {gameObjects.world} key = {JSON.stringify(gameObjects) + " door"} info = {gameObjects.door} update = {updateDoorState} selected = {selected}></Door>,
    <Avatar world = {gameObjects.world} key = {JSON.stringify(gameObjects) + " avatar"} info = {gameObjects.avatar} update = {updateAvatarState} selected = {selected}></Avatar>,
    ]
    )
  let components = componentList;
  for (let [key, value] of Object.entries(gameObjects.turrets)) {
    components.push(<Turret world = {gameObjects.world} key = {key} info = {value} id = {key} update = {updateTurretState} selected = {selected}></Turret>);
  }
  for (let [key, value] of Object.entries(gameObjects.capsules)) {
    components.push(<Capsule world = {gameObjects.world} key = {key + Math.random()} info = {value} id = {key} update = {updateCapsuleState} selected = {selected}></Capsule>);
  }
  for (let [key, value] of Object.entries(gameObjects.diamonds)) {
    components.push(<Diamond world = {gameObjects.world} key = {key + Math.random()} info = {value} id = {key} update = {updateDiamondState} selected = {selected}></Diamond>);
  }
  for (let [key, value] of Object.entries(gameObjects.rounds)) {
    components.push(<Round world = {gameObjects.world} key = {key + Math.random()} info = {value} id = {key} update = {updateRoundState} selected = {selected}></Round>);
  }
  for (let [key, value] of Object.entries(gameObjects.enemies)) {
    components.push(<Enemy world = {gameObjects.world} key = {key} info = {value} id = {key} update = {updateEnemyState} selected = {selected}></Enemy>);
  }
  for (let [key, value] of Object.entries(gameObjects.spikes)) {
    components.push(<Spike world = {gameObjects.world} key = {key} info = {value} id = {key} update = {updateSpikeState} selected = {selected}></Spike>);
  }
  // <Turret key = {JSON.stringify(gameObjects) + 'turret'} info = {gameObjects.turrets.turret1} id = 'turret1' update = {updateTurretState} selected = {selected}></Turret>
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        {components}

    </div>
  );
}

export default ItemDashboard;
