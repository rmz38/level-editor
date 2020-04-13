import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { UncontrolledCollapse,Button, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// ES6


interface Props {
  info:any
  update: (data:any) => void
  selected: (compName:string, open:boolean) => void
  world:any
}

// "door": {
//   "pos": [
//     29.5,
//     15.5
//   ],
//   "size": [
//     1.6,
//     1.6
//   ],
//   "texture": "goal",
//   "bodytype": "static",
//   "density": 0.0,
//   "friction": 0.0,
//   "restitution": 0.0,
//   "sensor": true,
//   "nextlevel": 0,
//   "space": 3
const Door : React.FC<Props> = ({info, update,selected, world}) => {
  const{ pos, size, bodytype, density, friction, restitution, texture, sensor, nextlevel, space} = info
  const [isOpen, setIsOpen] = useState(false);
  console.log(sensor);
  let posState = pos
  let sizeState = size
  let bodytypeState = bodytype
  let densityState = density
  let frictionState = friction
  let restitutionState = restitution
  let textureState = texture
  let sensorState = sensor
  let nextlevelState = nextlevel
  let spaceState = space
  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1000 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }
  let convertedPos = gameCoordToPx(pos)
  let updatedState = () => {
    return {
      pos:posState,
      size:sizeState,
      bodytype:bodytypeState,
      density:densityState,
      friction:frictionState,
      restitution:restitutionState,
      texture:textureState,
      sensor:sensorState,
      nextlevel:nextlevelState,
      space:spaceState
    }

  }
  const toggle = () => {
    setIsOpen(!isOpen);
    selected('door', isOpen);
  }
  ;
  return (
    <div >
      <Button color="primary" onClick = {toggle} id="door" style={{ width: '100%', marginBottom: '1rem' }}>Door</Button>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position(x,y)</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{posState[0] = +e.target.value; update(updatedState())}} default Value = {pos[0]}/>
          <Input onBlur={e =>{posState[1] = +e.target.value; update(updatedState())}} default Value = {pos[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Size</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{sizeState[0] = +e.target.value; update(updatedState())}} default Value = {size[0]}/>
          <Input onBlur={e =>{sizeState[1] = +e.target.value; update(updatedState())}} default Value = {size[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{bodytypeState = e.target.value; update(updatedState())}} default Value = {bodytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{densityState = +e.target.value; update(updatedState())}} default Value = {density}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Friction</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{frictionState = +e.target.value; update(updatedState())}} default Value = {friction}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Restitution</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{restitutionState = +e.target.value; update(updatedState())}} default Value = {restitution}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{textureState = e.target.value; update(updatedState())}} default Value = {texture}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Sensor</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{sensorState = (e.target.value == 'true'); update(updatedState())}} default Value = {sensor.toString()}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Next Level</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{nextlevelState = +e.target.value; update(updatedState())}} default Value = {nextlevel}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Space</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{spaceState = e.target.value; update(updatedState())}} default Value = {space}/>
        </InputGroup>
        <div style = {{display: isOpen ? 'block': 'none',height:'90px', width: '90px', backgroundColor:'yellow', opacity: '50%', position:'absolute', left:convertedPos[0] - 40 + 'px', bottom:convertedPos[1] - 40 + 'px'}}></div>
      </Collapse>
    </div>
  );
}

export default Door;

