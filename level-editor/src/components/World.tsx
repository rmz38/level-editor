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

  //update is a prop for updating in App the state, passes through ItemDashboard first
  const [isOpen, setIsOpen] = useState(false);
  const {gravity, bounds, backgroundPres, backgroundPast} = info
  const toggle = () => { //for toggling hiding the menu
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
