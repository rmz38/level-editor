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
const Spike : React.FC<Props> = ({info, update, selected, id, world}) => {

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {pos, bodytype, density, friction, restitution, texture, space, angle} = info

  let posState= pos
  let bodytypeState = bodytype
  let densityState = density
  let frictionState = friction
  let restitutionState = restitution
  let textureState = texture
  let spaceState = space
  let angleState = angle


  let gameCoordToPx = (gc:Array<number>) => {
    return [gc[0] * 1000 / world.bounds[0], gc[1] * 600 / world.bounds[1]]
  }
  let convertedPos = gameCoordToPx(pos)

  let updatedState = () => {
    return {
      pos: posState,
      bodytype: bodytypeState,
      density: densityState,
      friction: frictionState,
      restitution: restitutionState,
      texture: textureState,
      space: spaceState,
      angle: angleState
    }
  }
  const toggle = () => { //for toggling hiding the menu
    setIsOpen(!isOpen);
    selected('spike', isOpen);
  };
  return (
    <div >
      <ButtonGroup style = {{width: '100%'}}>
        <Button color="primary" onClick = {toggle} id="spike" style={{ backgroundColor: '#1aa7e8', marginBottom: '1rem' }}>{id}</Button>
        <Button color="danger" onClick = {() => update('delete', id)} id="delete" style={{ marginBottom: '1rem' }}>X</Button>
      </ButtonGroup>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posState =[+e.target.value,posState[1]]; update(updatedState(), id)}} defaultValue = {pos[0]}/>
            <Input onBlur={(e) =>{posState =[posState[0],+e.target.value]; update(updatedState(), id)}} defaultValue = {pos[1]}/>
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
            <InputGroupText>Friction</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{frictionState = +e.target.value; update(updatedState(), id)}} defaultValue = {friction}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Restitution</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{restitutionState = +e.target.value; update(updatedState(), id)}} defaultValue = {restitution}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeState = e.target.value; update(updatedState(), id)}} defaultValue = {bodytype}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Space</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{spaceState = e.target.value; update(updatedState(), id)}} defaultValue = {space}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Angle</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{angleState = +e.target.value; update(updatedState(), id)}} defaultValue = {angle}/>
        </InputGroup>
        <div style = {{display: isOpen ? 'block': 'none',height:'60px', width: '60px', backgroundColor:'yellow', opacity: '50%', position:'absolute', left:convertedPos[0] - 30, bottom:convertedPos[1]}}></div>
      </Collapse>
    </div>
  );
}

export default Spike;
