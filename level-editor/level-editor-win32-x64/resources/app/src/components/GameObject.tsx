import React, { Fragment, useState, ReactComponentElement } from 'react'
import logo from './logo.svg';
import { string } from 'prop-types';
// "turret1":{
//   "pos":       	[ 8.5, 10.0],
//   "size":      	[ 1.92, 1.92],
//   "bodytype":  	"static",
//   "density":    	0.0,
//   "friction":   	0.0,
//   "restitution":	0.0,
//   "texture":   	"turret",
//   "vel": [12.0, 8.0],
//   "cooldown": 42,
//   "shootsound": "pew"
// }
const turret = {
  pos: [2,3]
}
interface GameObjectState {
  name: string,
  info: Object
}

interface Props {
  name: string,
  jsoninput: Object
}
const GameObject : React.FC<Props> = ({name, jsoninput}) => {
  const [gameObjectName, setName] = useState(name);
  const [json, setJson] = useState(JSON.parse(JSON.stringify(jsoninput)));
  return (
    <div className="Item">
        Item
        {jsoninput}
        {/* gameObjects.map((todo) => (
          <TodoItem key={todo.id} todo={todo} markComplete={this.props.markComplete} delTodo={this.props.delTodo} />
        )); */}
    </div>
  );
}
export default GameObject;

