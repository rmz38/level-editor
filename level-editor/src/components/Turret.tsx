import React, { Fragment, useState } from 'react'
import logo from './logo.svg';
import { string } from 'prop-types';
import GameObject from './GameObject';
import { Interface } from 'readline';
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
interface Props {
    id: string,
    pos: Array<number>,
    updatefn: (pos:Array<number>, id:number) => void
}
interface turretState {
    pos: Array<number>
}


const Turret : React.FC<Props> = ({pos, updatefn}) => {
    const [id, setId] = useState(1)
    updatefn([1,2], id);
    return (
    <div className="Turret">
        Turret
        {pos}
    </div>
    );
  }

  export default Turret;