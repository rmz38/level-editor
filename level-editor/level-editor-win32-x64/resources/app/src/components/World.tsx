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
  // isMenuOpenFn: (b:boolean) => boolean
  // isMenuOpen?: boolean
}

// gravity: -14.7,
//     bounds: [32.0,18.0],
//     backgroundPres: 'present_background',
//     backgroundPast: 'past_background',
//     diamondshape: [ 0.2, 1.8, 2.4, 1.8, 1.4, 0.1],
//     capsuleshape: [0.2,1.1,2.9,1.1,2.9,0.6,1.7,0.1,0.2,0.6],
//     roundshape: [ 0.1, 1.4, 0.5, 1.7, 2.4, 1.7, 2.7, 1.4, 2.6, 0.8, 2.0, 0.2, 0.8, 0.2 ],
//     density: 0.0,
//     heavy_density: 10.0,
//     friction: 0.6,
//     restitution: 0.1,
//     bullet_offset: 0.7,
//     effect_volume: 0.8
const World : React.FC<Props> = ({info, update,selected}) => {

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {gravity, bounds, backgroundPres, backgroundPast, diamondshape, capsuleshape, roundshape, density, heavy_density, friction, restitution, bullet_offset, effect_volume} = info
  const toggle = () => { //for toggling hiding the menu
    setIsOpen(!isOpen);
    selected('world', isOpen);
  };
  let gravityState = gravity
  let boundsState = bounds
  let backgroundPresState = backgroundPast
  let diamondshapeShape = diamondshape
  let capsuleshapeState = capsuleshape 
  let roundshapeState = roundshape
  let densityShape = density
  let heavy_densityState = heavy_density
  let frictionState = friction
  let restitutionState = restitution
  let bullet_offsetState = bullet_offset
  let effect_volumeState = effect_volume
  
  return (
    <div >
      <Button color="primary" onClick = {toggle} id="world" style={{ marginBottom: '1rem' }}>World</Button>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Gravity</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={(e) =>{update({ gravity:+e.target.value, bounds:info.bounds, backgroundPres:info.backgroundPres, backgroundPast:info.backgroundPast})}} defaultValue={info.gravity} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Bounds</InputGroupText>
          </InputGroupAddon>
          {/* TODO: change bounds input  */}
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[+e.target.value,bounds[1]], backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[0]} />
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[bounds[0],+e.target.value], backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[1]} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Present Background</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{update({ gravity:info.gravity, bounds:info.bounds, backgroundPres:e.target.value, backgroundPast:info.backgroundPast})}} defaultValue={info.backgroundPres} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Past Background</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ gravity:gravity, bounds:bounds, backgroundPres:backgroundPres, backgroundPast:e.target.value})} defaultValue={backgroundPast} />
        </InputGroup>
      </Collapse>
    </div>
  );
}

export default World;
