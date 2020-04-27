import React, { Fragment, useState } from 'react'
import './App.css';
import World from './components/World';
import ItemDashboard from './components/ItemDashboard';
import LevelWindow from './components/LevelWindow';
import Turret from './components/Turret';
import Door from './components/Door';
import Avatar from './components/Avatar';
// import uuid from 'uuid';

//initial json and level
let level = 0;
let levelInit = {
  world: {
    gravity: -14.7,
    bounds: [32.0,18.0],
    backgroundPres: 'present_background',
    backgroundPast: 'past_background',
    diamondshape: [ 0.2, 1.8, 2.4, 1.8, 1.4, 0.1],
    capsuleshape: [0.2,1.1,2.9,1.1,2.9,0.6,1.7,0.1,0.2,0.6],
    roundshape: [ 0.1, 1.4, 0.5, 1.7, 2.4, 1.7, 2.7, 1.4, 2.6, 0.8, 2.0, 0.2, 0.8, 0.2 ],
    spikeshape: [0.3, -0.6, 0.0, -0.2, -0.6, 0.0, -0.5, 0.4, 0.0, 0.6, 0.4, -0.2, 0.6, -0.3],
    density: 0.0,
    heavy_density: 10.0,
    friction: 0.6,
    restitution: 0.1,
    bullet_offset: 0.7,
    effect_volume: 0.8,
    past_music: "past2",
    present_music: "present2",
  },
  capsules: {
    presentcapsule1: {
      name: "present_capsule",
      pos: [
        3.0,
        7.0
      ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "present_capsule",
      space: 1
    },
    pastcapsule1: {
      name: "past_capsule",
      pos: [
        4.5,
        1.0
      ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "past_capsule",
      space: 2
    }
  },
  diamonds: {
    presentdiamond1: {
      name: "present_diamond",
      pos: [
        1.0,
        2.0
      ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "present_diamond",
      space: 1
    },
    pastdiamond1: {
      name: "past_diamond",
      pos: [
        13.5,
        3.5
      ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "past_diamond",
      space: 2
    },
    pastdiamond2: {
      name: "past_diamond",
      pos: [
        20.0,
        5.0
      ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "past_diamond",
      space: 2
    }
  },
  rounds: {
    presentround1: {
      name: "present_round",
      pos: [11.5, 2.0],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "present_round",
      space: 1
    },
    presentround2: {
      name: "present_round",
      pos: [ 9.5, 13.0 ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "present_round",
      space: 1
    },
    pastround1: {
      name: "past_round",
      pos: [ 2.0, 13.0 ],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "past_round",
      space: 2
    },
  },
  enemies: {
    enemy1: {
      pos: [13.0, 6.0],
      shrink: [0.0168, 0.021375],
      texture: "enemypresent",
      entitytype: "present",
      aitype: 1,
      cooldown: 120,
      bodytype: "dynamic",
      density: 1.0
    },
    enemy2: {
      pos: [15.625, 11.03125],
      shrink: [0.0168, 0.021375],
      texture: "enemypast",
      aitype: 1,
      entitytype: "past",
      cooldown: 120,
      bodytype: "dynamic",
      density: 1.0
    }
  },
  avatar: {
    pos: [2.5, 5.0],
    shrink: [0.0216,0.01125],
    texture: 'dude',
    density: 1.0,
    bodytype: 'dynamic',
    avatarstanding: 'avatarstanding',
    avatarcrouching: 'avatarcrouching',
    avatardashing: 'avatardashing',
    avatarfalling: 'avatarfalling'
  },
  door: {
    pos: [29.5, 15.5],
    size: [1.92, 1.92],
    bodytype: 'static',
    density: 0.0,
    friction: 0.0,
    restitution: 0.0,
    texture: 'goal',
    sensor: true,
    nextlevel: 0,
    space: 3
  },
  turrets: {
    turret1: {
      pos: [18.5,10.3],
      shrink: [0.0168, 0.021375],
      texture: "turret_present",
      entitytype: "present",
      cooldown: 360,
      direction: [-3.0, 0.0],
      bodytype: "static",
      density: 1.0
    },
    turret2: {
      pos: [8.5, 5.0],
      shrink: [0.0168, 0.021375],
      texture: "turret_past",
      entitytype: "past",
      cooldown: 480,
      direction: [0.0, 2.0],
      bodytype: "static",
      density: 1.0
    }
  },
  spikes:{
    spike0:{
      pos: [3,4],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "spikes",
      space: 1,
      angle: 30
    },
    spike1:{
      pos: [5,6],
      bodytype: "static",
      density: 0.0,
      friction: 0.6,
      restitution: 0.1,
      texture: "spikes",
      space: 1,
      angle: 30
    }

  }
};

//styling for container holding Level Window and ItemDashboard
const containerStyling = {
  height: '600px',
  minWidth: '1000px',
  // width: '100vw',
  display: 'flex'
}

//styling for this
const headerStyling = {
  minHeight: '30px',
  height: '30px',
  width: '100%',
  display: 'inline-block',
  padding:0
}

//downloads state info as a json called export
function exportToJson(objectData: JSON) {
  let filename = "level_" + level + ".json";
  let contentType = "application/json;charset=utf-8;";
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    var a = document.createElement('a');
    a.download = filename;
    a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}


const App : React.FC = ({}) => {
  
  const [world, setWorld] = useState(levelInit.world);
  const [avatar, setAvatar] = useState(levelInit.avatar);
  const [door, setDoor] = useState(levelInit.door);
  const [turrets, setTurrets] = useState(levelInit.turrets);
  const [capsules, setCapsules] = useState(levelInit.capsules);
  const [diamonds, setDiamonds] = useState(levelInit.diamonds);
  const [rounds, setRounds] = useState(levelInit.rounds);
  const [enemies, setEnemies] = useState(levelInit.enemies);
  const [spikes, setSpikes] = useState(levelInit.spikes);
  const [gameObjects, setGameObjects] = useState<any>(levelInit); //represents json, init with levelinit
  const [numPlat, setNumPlat] = useState(9);
  const [numEnemy, setNumEnemy] = useState(5);
  const [objectPostitions, setOp] = useState(new Object()) // not used yet


  let editorObjects = useState([{id:'world', selected: false}]); //not used yet
  let updateState = (newState:any) => { // updates state
    let {world, capsules, diamonds, rounds, enemies, avatar, door, turrets, spikes} = newState;
    setWorld(world)
    setAvatar(avatar)
    setDoor(door)
    setTurrets(turrets)
    setEnemies(enemies)
    setCapsules(capsules)
    setDiamonds(diamonds)
    setRounds(rounds)
    setSpikes(spikes)
    setGameObjects(newState)
  }
  let selectComponent = (id:string, open:boolean) => { //not used for anything yet
    editorObjects.map(
      (item:any) => {
        if(item.id == id){
          item.selected = true;
        }else{
          item.selected = false;
        }
    })
  }
  let updateNumPlat = (n:number) => {
    setNumPlat(n);
  }
  let updateNumEnemy = (n:number) => {
    setNumEnemy(n);
  }
  //used for debugging and formatting json during download
  
  // gravity: -14.7,
  // bounds: [32.0,18.0],
  // "present_background": "present_background",
  // "past_background": "past_background",
  // diamondshape: [ 0.2, 1.8, 2.4, 1.8, 1.4, 0.1],
  // capsuleshape: [0.2,1.1,2.9,1.1,2.9,0.6,1.7,0.1,0.2,0.6],
  // roundshape: [ 0.1, 1.4, 0.5, 1.7, 2.4, 1.7, 2.7, 1.4, 2.6, 0.8, 2.0, 0.2, 0.8, 0.2 ],
  // density: 0.0,
  // heavy_density: 10.0,
  // friction: 0.6,
  // restitution: 0.1,
  // bullet_offset: 0.7,
  // effect_volume: 0.8
  let tester = {
    gravity: world.gravity,
    bounds: world.bounds,
    present_background: world.backgroundPres,
    past_background: world.backgroundPast,
    diamondshape: world.diamondshape,
    capsuleshape: world.capsuleshape,
    roundshape: world.roundshape,
    spikeshape: world.spikeshape,
    density: world.density,
    heavy_density: world.heavy_density,
    friction: world.friction,
    restitution: world.restitution,
    bullet_offset: world.bullet_offset,
    effect_volume: world.effect_volume,
    past_music: world.past_music,
    present_music: world.present_music,
    door,
    avatar,
    turrets,
    capsules,
    diamonds,
    rounds,
    enemies,
    spikes
  }
  let rename = (base:string, objects:any) =>{
    let index = 1
    let newObject:any = {}
    for(let [key, value] of Object.entries(objects)){
      newObject[base + index + ""] = value
      index++
    }
    return newObject
  }
  let reader = new FileReader()
  reader.onload = function(e:any) {
    let newJSON:any = JSON.parse(JSON.parse(JSON.stringify(e.target.result,null,2)))
    console.log('newjson',newJSON)
    let {gravity, bounds, present_background, past_background, diamondshape, capsuleshape, roundshape}:any = newJSON
    let reformat = {
      world:{
        gravity: gravity,
        bounds:bounds,
        backgroundPres:present_background,
        backgroundPast:past_background,
        diamondshape:diamondshape,
        capsuleshape:capsuleshape,
        roundshape:roundshape
      },
      door:newJSON.door,
      avatar:newJSON.avatar,
      turrets:rename('turret',newJSON.turrets),
      capsules:rename('capsule',newJSON.capsules),
      diamonds:rename('diamond', newJSON.diamonds),
      rounds:rename('round',newJSON.rounds),
      enemies:rename('enemies',newJSON.enemies),
      spikes:rename('spike', newJSON.spikes)
    }
    updateState(reformat);
    
  }
  console.log("App", gameObjects)
  return (
    <div className="App" >
      <div className="App-header" style = {headerStyling} >
        <label htmlFor="level_input">Level</label>
        <input style = {{marginLeft: '20px', height:'20px', fontSize:'7pt'}} id = "level_input" type="text" name="text" onChange={(e:any) => {level = e.target.value}}/>
        <button onClick= {() => exportToJson(JSON.parse(JSON.stringify(tester)))} style = {{marginLeft: '20px',height:'20px', fontSize:'7pt'}}>Download</button>
        <input style = {{marginLeft: '20px', height:'20px', fontSize:'7pt'}} type="file" name="file" onChange={(e:any) => {
          if(typeof e.target.files[0] == 'object'){
           reader.readAsText(e.target.files[0])
          }
          }}/>
      </div>
      <div style = {containerStyling}>
        <LevelWindow key = {JSON.stringify(gameObjects) + "lw"} backgroundPastPath = {world.backgroundPast} backgroundPresPath = {world.backgroundPres} 
          gameObjectState = {gameObjects} updateState = {updateState}></LevelWindow>
        <ItemDashboard updateNumEnemyApp = {updateNumEnemy} numEnemy = {numEnemy} updateNumPlatApp = {updateNumPlat} numPlat = {numPlat} key = {JSON.stringify(gameObjects)} gameObjectsInput={gameObjects} update={updateState} selected={selectComponent}>
          </ItemDashboard>
      </div>
    </div>
  );
}

export default App;
