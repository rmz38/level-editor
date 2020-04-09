import React, { Fragment, useState } from 'react'
import './App.css';
import World from './components/World';
import ItemDashboard from './components/ItemDashboard';
import LevelWindow from './components/LevelWindow';
import Turret from './components/Turret';
import Door from './components/Door';
// import uuid from 'uuid';

let levelInit = {
  world: {
    gravity: -9.8,
    bounds: [0.0,0.0,2.0,3.0],
    scale: [2.0,3.0],
    backgroundPres: 'present',
    backgroundPast: 'past'
  },
  platforms: [],
  walls: [],
  avatar: {
    pos: [2.5, 5.0],
    size: [0.45, 0.61],
    bodyType: 'dynamic',
    density: 1.0,
    friction: 0.0,
    restitution: 0.0,
    damping: 10.0,
    maxSpeed: 100.0,
    jumpSound: 'dude',
    texture: 'dude',
    bottomSensorName: 'dudeGroundSensor',
    topSensorName: 'dudeTopSensor',
    leftSensorName: 'dudeLeftSensor',
    rightSensorName: 'dudeRightSensor',
    dashRange: 4,
    dashForce: 1000
  },
  door: {
    pos: [7.0, 10.0],
    size: [1.92, 1.92],
    bodyType: 'static',
    density: 0.0,
    friction: 0.0,
    restitution: 0.0,
    texturePres: 'goaldoorPres',
    texturePast: 'goaldoorPast'
  },
  turrets: []
};

const containerStyling = {
  height: '600px',
  width: '100%',
  display: 'flex'
}

const appStyling = {
  minHeight: '10px',
  height: '10px',
  width: '100%'
}


function exportToJson(objectData: JSON) {
  let filename = "export.json";
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
interface Props {
  gameObjectsProps: Array<any>
}

const App : React.FC = ({}) => {
  
  const [world, setWorld] = useState(levelInit.world);
  const [platforms, setPlatforms] = useState(levelInit.platforms);
  const [walls, setWalls] = useState(levelInit.walls);
  const [avatar, setAvatar] = useState(levelInit.avatar);
  const [door, setDoor] = useState(levelInit.door);
  const [turrets, setTurrets] = useState(levelInit.turrets);
  const [gameObjects, setGameObjects] = useState<any>(levelInit);

  let editorObjects = useState([{id:'world', selected: false}]);
  let updateState = (newState:any) => {
    let {world, platforms, walls, avatar, door, turrets} = newState;
    setWorld(newState.world);
    setPlatforms(newState.platforms);
    setWalls(newState.walls);
    setAvatar(newState.avatar);
    setDoor(newState.door);
    setTurrets(newState.turrets);
    setGameObjects(newState);
  }
  let selectComponent = (id:string, open:boolean) => {
    editorObjects.map(
      (item:any) => {
        if(item.id == id){
          item.selected = true;
        }else{
          item.selected = false;
        }
    })
  }
  let tester = {
    door,
    world,
    platforms,
    walls,
    avatar,
    turrets
  }

  return (
    <div className="App" >
      <header className="App-header" style = {appStyling} >
        <button onClick= {() => exportToJson(JSON.parse(JSON.stringify(tester)))}>Download</button>
      </header>
      <div style = {containerStyling}>
        <LevelWindow debug = {JSON.stringify(JSON.parse(JSON.stringify(tester)))}></LevelWindow>
        <ItemDashboard key = {JSON.stringify(gameObjects)} gameObjectsInput={gameObjects} update={updateState} selected={selectComponent}>
          </ItemDashboard>
      </div>
    </div>
  );
}

export default App;
