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


const World : React.FC<Props> = ({info, update,selected}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {gravity, bounds, scale, backgroundPres, backgroundPast} = info
  const toggle = () => {
    setIsOpen(!isOpen);
    selected('world', isOpen);
  }
  ;
  return (
    <div >
      <Button color="primary" onClick = {toggle} id="world" style={{ marginBottom: '1rem' }}>World</Button>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Gravity</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={(e) =>{update({ gravity:+e.target.value, bounds:info.bounds, scale:info.scale, backgroundPres:info.backgroundPres, backgroundPast:info.backgroundPast})}} defaultValue={info.gravity} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Bounds</InputGroupText>
          </InputGroupAddon>
          {/* TODO: change bounds input  */}
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[+e.target.value,bounds[1],bounds[2],bounds[3]], scale:scale, backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[0]} />
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[bounds[0],+e.target.value, bounds[2], bounds[3]], scale:scale, backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[1]} />
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[bounds[0],bounds[1],+e.target.value,bounds[3]], scale:scale, backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[2]} />
          <Input onBlur={e =>{update({ gravity:gravity, bounds:[bounds[0],bounds[1],bounds[2],+e.target.value], scale:scale, backgroundPres:backgroundPres, backgroundPast:backgroundPast})}} defaultValue={bounds[3]} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Scale(h,w)</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ gravity:gravity, bounds:bounds, scale:[+e.target.value,scale[1]], backgroundPres:backgroundPres, backgroundPast:backgroundPast})} defaultValue={scale[0]} />
          <Input onBlur={e =>update({ gravity:gravity, bounds:bounds, scale:[scale[0], +e.target.value], backgroundPres:backgroundPres, backgroundPast:backgroundPast})} placeholder={scale[1]} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Present Background</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{update({ gravity:info.gravity, bounds:info.bounds, scale:info.scale, backgroundPres:e.target.value, backgroundPast:info.backgroundPast})}} defaultValue={info.backgroundPres} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Past Background</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ gravity:gravity, bounds:bounds, scale:scale, backgroundPres:backgroundPres, backgroundPast:e.target.value})} defaultValue={backgroundPast} />
        </InputGroup>
      </Collapse>
    </div>
  );
}

export default World;

// gravity: -9.8,
//     bounds: [0.0,0.0,2.0,3.0],
//     scale: [2.0,3.0],
//     backgroundPres: 'present',
//     backgroundPast: 'past'