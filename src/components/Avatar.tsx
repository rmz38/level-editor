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
  world: any
  // isMenuOpenFn: (b:boolean) => boolean
  // isMenuOpen?: boolean
}
 // "pos": [2.5,5.0],/
  //   "shrink": [0.0216,0.01125],/
  //   "texture": "dude",
  //   "density": 1.0,
  //   "bodytype": "dynamic", /
  //   "avatarstanding": "avatarstanding",
  //   "avatarcrouching": "avatarcrouching",
  //   "avatardashing": "avatardashing",
  //   "avatarfalling": "avatarfalling"

const Avatar : React.FC<Props> = ({info, update,selected, world}) => {

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {pos, shrink, texture, density, bodytype, avatarstanding, avatarcrouching, avatardashing, avatarfalling} = info

  let posState= pos
  let shrinkState = shrink
  let textureState = texture
  let densityState = density
  let bodytypeState = bodytype
  let avatarstandingState = avatarstanding
  let avatarcrouchingState = avatarcrouching
  let avatardashingState = avatardashing
  let avatarfallingState = avatarfalling
  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1000 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }
  let convertedPos = gameCoordToPx(pos)
  let updatedState = () => {
      return {
          pos: posState,
          shrink: shrinkState,
          texture: textureState,
          density: densityState,
          bodytype: bodytypeState,
          avatarstanding: avatarstandingState,
          avatarcrouching: avatarcrouchingState,
          avatardashing: avatardashingState,
          avatarfalling: avatarfallingState
      }
  }
  const toggle = () => { //for toggling hiding the menu
    setIsOpen(!isOpen);
    selected('world', isOpen);
  };
  return (
    <div >
      <Button color="primary" onClick = {toggle} id="world" style={{ width: '100%', marginBottom: '1rem' }}>Avatar</Button>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posState =[+e.target.value,posState[1]]; update(updatedState())}} defaultValue = {info.pos[0]}/>
            <Input onBlur={(e) =>{posState =[posState[0],+e.target.value]; update(updatedState())}} defaultValue = {pos[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Shrink</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{shrinkState =[+e.target.value,shrinkState[1]]; update(updatedState())}} defaultValue = {shrink[0]}/>
            <Input onBlur={(e) =>{shrinkState =[shrinkState[0],+e.target.value]; update(updatedState())}} defaultValue = {shrink[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Shrink</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{shrinkState =[+e.target.value,shrinkState[1]]; update(updatedState())}} defaultValue = {shrink[0]}/>
            <Input onBlur={(e) =>{shrinkState =[shrinkState[0],+e.target.value]; update(updatedState())}} defaultValue = {shrink[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureState = e.target.value; update(updatedState())}} defaultValue = {texture}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityState = +e.target.value; update(updatedState())}} defaultValue = {density}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeState = e.target.value; update(updatedState())}} defaultValue = {bodytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Standing</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{avatarstandingState = e.target.value; update(updatedState())}} defaultValue = {avatarfalling}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Crouching</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{avatarcrouchingState = e.target.value; update(updatedState())}} defaultValue = {avatarcrouching}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Dashing</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{avatardashingState = e.target.value; update(updatedState())}} defaultValue = {avatardashing}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Falling</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{avatarfallingState = e.target.value; update(updatedState())}} defaultValue = {avatarfalling}/>
        </InputGroup>
        <div style = {{display: isOpen ? 'block': 'none',height:'60px', width: '60px', backgroundColor:'yellow', opacity: '50%', position:'absolute', left:convertedPos[0] - 30, bottom:convertedPos[1]}}></div>
      </Collapse>
    </div>
  );
}

export default Avatar;
