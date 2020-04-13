import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { Button, ButtonGroup, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// ES6


interface Props {
  info:any
  id: string
  update: (data:any, i:string) => void
  selected: (compName:string, open:boolean) => void
  world:any
  // isMenuOpenFn: (b:boolean) => boolean
  // isMenuOpen?: boolean
}
// "turret2": {
//     "pos": [8.5, 5.0],
//     "shrink": [0.0168, 0.021375],
//     "texture": "turret",
//     "entitytype": "past",
//     "cooldown": 480,
//     "direction": [0.0, 2.0],
//     "bodytype": "static",
//     "density": 1.0
//   }

const Turret : React.FC<Props> = ({info, update, selected, id, world}) => {

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {pos, shrink, texture, entitytype, cooldown, direction, bodytype, density} = info

  let posState= pos
  let shrinkState = shrink
  let textureState = texture
  let densityState = density
  let bodytypeState = bodytype
  let entitytypeState = entitytype
  let cooldownState = cooldown
  let directionState = direction
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
          entitytype:entitytypeState,
          cooldown:cooldownState,
          direction:directionState
      }
  }
  const toggle = () => { //for toggling hiding the menu
    setIsOpen(!isOpen);
    selected('world', isOpen);
  };
  return (
    <div >
      <ButtonGroup style = {{width: '100%'}}>
        <Button color="primary" onClick = {toggle} id="world" style={{backgroundColor: '#5143a3', marginBottom: '1rem' }}>{id}</Button>
        <Button color="danger" onClick = {() => update('delete', id)} id="delete" style={{ marginBottom: '1rem' }}>Delete</Button>
      </ButtonGroup>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posState =[+e.target.value,posState[1]]; update(updatedState(), id)}} defaultValue = {info.pos[0]}/>
            <Input onBlur={(e) =>{posState =[posState[0],+e.target.value]; update(updatedState(), id)}} defaultValue = {pos[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Shrink</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{shrinkState =[+e.target.value,shrinkState[1]]; update(updatedState(), id)}} defaultValue = {shrink[0]}/>
            <Input onBlur={(e) =>{shrinkState =[shrinkState[0],+e.target.value]; update(updatedState(), id)}} defaultValue = {shrink[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureState = e.target.value; update(updatedState(), id)}} defaultValue = {texture}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityState = +e.target.value; update(updatedState(), id)}} defaultValue = {density}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeState = e.target.value; update(updatedState(), id)}} defaultValue = {bodytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Entity Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{entitytypeState = e.target.value; update(updatedState(), id)}} defaultValue = {entitytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Cooldown</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{cooldownState = +e.target.value; update(updatedState(), id)}} defaultValue = {cooldown}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Direction</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{directionState = [+e.target.value, direction[1]]; update(updatedState(), id)}} defaultValue = {direction[0]}/>
            <Input onBlur={(e) =>{directionState = [direction[0], +e.target.value]; update(updatedState(), id)}} defaultValue = {direction[1]}/>
        </InputGroup>
        <div style = {{display: isOpen ? 'block': 'none',height:'60px', width: '60px', backgroundColor:'yellow', opacity: '50%', position:'absolute', left:convertedPos[0] - 20 , bottom:convertedPos[1]}}></div>
      </Collapse>
    </div>
  );
}

export default Turret;
