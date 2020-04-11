import { UncontrolledCollapse, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
// ES6


interface Props {
  gameObjects: any
  updateTurret: (data:any, id:string) => void
  updateEnemy: (data:any, id:string) => void
  updatePlatform: (data:any, id:string, type:string) => void
  // selected: (compName:string, open:boolean) => void
}

const AddButton : React.FC<Props> = ({gameObjects, updateTurret, updateEnemy,updatePlatform}) => {
  let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
  const [isCheckedTurret, setIsCheckedTurret] = useState(true);
  const [isCheckedEnemy, setIsCheckedEnemy] = useState(false);
  const [isCheckedPlatform, setIsCheckedPlatform] = useState(false);

  let posStateTurret= [17,9]
  let shrinkStateTurret = [13,6]
  let textureStateTurret = 'turret'
  let densityStateTurret = 1.0
  let bodytypeStateTurret = 'static'
  let entitytypeStateTurret = 'present'
  let cooldownStateTurret = 360
  let directionStateTurret = [-3, 0]

  let newTurret = () => {
    let newKey = 'turret' + (Object.keys(turrets).length + 1)
    let newTurret = {
      pos:posStateTurret,
      shrink:shrinkStateTurret,
      texture:textureStateTurret,
      density:densityStateTurret,
      bodytype:bodytypeStateTurret,
      entitytype:entitytypeStateTurret,
      cooldown:cooldownStateTurret,
      direction:directionStateTurret
    }
    updateTurret(newTurret, newKey)
  }

  let itemTypeStyle = {
    marginLeft: '5px'
  };
  return (
    <div >
      <Button color="info" id="toggler" style={{ marginBottom: '2px' }}>Add</Button>
      <UncontrolledCollapse toggler = "#toggler">
        <Form inline>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {setIsCheckedTurret(!isCheckedTurret)}} type="radio" name="itemType" id="itemTypeTurret" style = {{marginLeft: '8px'}}defaultChecked /> Turret {' '} 
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {setIsCheckedEnemy(!isCheckedEnemy)}} type="radio" name="itemType" id="itemTypeEnemy" /> Enemy {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {setIsCheckedPlatform(!isCheckedPlatform)}} type="radio" name="itemType"  id="itemTypePlatform" /> Platform {' '} 
            </Label>
          </FormGroup>  
        </Form>
        <Collapse isOpened = {isCheckedTurret}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posStateTurret =[+e.target.value,posStateTurret[1]]; }} defaultValue = {posStateTurret[0]}/>
            <Input onBlur={(e) =>{posStateTurret =[posStateTurret[0],+e.target.value];  }} defaultValue = {posStateTurret[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Shrink</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{shrinkStateTurret =[+e.target.value,shrinkStateTurret[1]]; }} defaultValue = {shrinkStateTurret[0]}/>
            <Input onBlur={(e) =>{shrinkStateTurret =[shrinkStateTurret[0],+e.target.value];  }} defaultValue = {shrinkStateTurret[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureStateTurret = e.target.value;  }} defaultValue = {textureStateTurret}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityStateTurret = +e.target.value;  }} defaultValue = {densityStateTurret}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeStateTurret = e.target.value;  }} defaultValue = {bodytypeStateTurret}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Entity Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{entitytypeStateTurret = e.target.value;  }} defaultValue = {entitytypeStateTurret}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Cooldown</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{cooldownStateTurret = +e.target.value;  }} defaultValue = {cooldownStateTurret}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Direction</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{directionStateTurret = [+e.target.value, directionStateTurret[1]];  }} defaultValue = {directionStateTurret[0]}/>
            <Input onBlur={(e) =>{directionStateTurret = [directionStateTurret[0], +e.target.value];  }} defaultValue = {directionStateTurret[1]}/>
        </InputGroup>
        </Collapse>
        <Button onClick = {() => {newTurret()}}>Submit</Button>
      </UncontrolledCollapse>
    </div>
  );
}

export default AddButton;

