import { UncontrolledCollapse, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
// ES6


interface Props {
  gameObjects: any
  updateTurret: (data:any, id:string) => void
  updateEnemy: (data:any, id:string) => void
  updatePlatform: (data:any, id:string, type:string) => void
  updateNumPlat: (n:number) => void
  numPlat:number
  // selected: (compName:string, open:boolean) => void
}

const AddButton : React.FC<Props> = ({gameObjects, updateTurret, updateEnemy,updatePlatform, numPlat, updateNumPlat}) => {
  let {avatar,world, door, turrets, diamonds, rounds, enemies, capsules} = gameObjects
  const [isCheckedTurret, setIsCheckedTurret] = useState(true);
  const [isCheckedEnemy, setIsCheckedEnemy] = useState(false);
  const [isCheckedPlatform, setIsCheckedPlatform] = useState(false);
  const [isCheckedCapsule, setIsCheckedCapsule] = useState(false);
  const [isCheckedDiamond, setIsCheckedDiamond] = useState(false);
  const [isCheckedRound, setIsCheckedRound] = useState(false);
  // const [numPlatforms, setNumPlatforms] =useState(numPlat)
  const [init, setInit] = useState(true);

  let openTurret = () => {
    setIsCheckedEnemy(false);
    setIsCheckedTurret(true);
    setIsCheckedPlatform(false);
  }
  let openEnemy = () => {
    setIsCheckedEnemy(true);
    setIsCheckedTurret(false);
    setIsCheckedPlatform(false);
  }
  let openPlatform = () => {
    setIsCheckedEnemy(false);
    setIsCheckedTurret(false);
    setIsCheckedPlatform(true);
  }
  // let openCapsule = () => {
  //   openPlatform()

  // }
  
  //turret states 
  let posStateTurret= [17,9]
  let shrinkStateTurret = [0.0168, 0.021375]
  let textureStateTurret = 'turret'
  let densityStateTurret = 1.0
  let bodytypeStateTurret = 'static'
  let entitytypeStateTurret = 'present'
  let cooldownStateTurret = 360
  let directionStateTurret = [-3, 0]

  //enemy states
  let posStateEnemy= [17, 9]
  let shrinkStateEnemy = [0.0168, 0.021375]
  let textureStateEnemy = 'enemypresent'
  let densityStateEnemy = 1.0
  let bodytypeStateEnemy = 'dynamic'
  let entitytypeStateEnemy = 'present'
  let cooldownStateEnemy = 120

  //platform states 
  let platformType = 'capsule'
  let nameStatePlatform = 'present_capsule'
  let posStatePlatform= [17, 9]
  let bodytypeStatePlatform = 'static'
  let densityStatePlatform = 0.0
  let frictionStatePlatform = .6
  let restitutionStatePlatform = .1
  let textureStatePlatform = 'present_capsule'
  let spaceStatePlatform = 1

  let newTurret = () => {
    let newKey = 'turret'
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
  let newEnemy = () => {
    let newKey = 'enemy'
    let newEnemy = {
      pos:posStateEnemy,
      shrink:shrinkStateEnemy,
      texture:textureStateEnemy,
      density:densityStateEnemy,
      bodytype:bodytypeStateEnemy,
      entitytype:entitytypeStateEnemy,
      cooldown:cooldownStateEnemy,
    }
    updateEnemy(newEnemy, newKey)
  }
  let newPlatform = (type:string) => {
    let time = 'bugHappened'
    let newKey = 'bugHappened'
    if (spaceStatePlatform == 1 || spaceStatePlatform == 3){
      time = 'present'
    } else if(spaceStatePlatform == 2){
      time = 'past'
    } else {
      time = 'bugNotPastPres'
    }

    newKey = time + type
    let newPlatform = {
      name:nameStatePlatform,
      pos:posStatePlatform,
      bodytype:bodytypeStatePlatform,
      density:densityStatePlatform,
      friction:frictionStatePlatform,
      restitution:restitutionStatePlatform,
      texture:textureStatePlatform,
      space:spaceStatePlatform
    }
    updateNumPlat(numPlat + 1)
    updatePlatform(newPlatform, newKey, platformType)
  }

  let itemTypeStyle = {
    marginLeft: '5px'
  };
  return (
    <div >
      <Button color="secondary" id="toggler" style={{ backgroundColor: '#fa511e', marginBottom: '2px' }}>Add</Button>
      <UncontrolledCollapse toggler = "#toggler">
        <Form inline>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {openTurret()}} type="radio" name="itemType" id="itemTypeTurret" style = {{marginLeft: '8px'}}defaultChecked /> Turret {' '} 
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {openEnemy()}} type="radio" name="itemType" id="itemTypeEnemy" /> Enemy {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {() => {openPlatform()}} type="radio" name="itemType"  id="itemTypePlatform" /> Platform {' '} 
            </Label>
          </FormGroup>  
        </Form>
        {/* turret inputs */}
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
        <Button onClick = {() => {newTurret()}}>Submit</Button>
        </Collapse>
        {/* end turret inputs */}
        {/* begin enemy inputs */}
        <Collapse isOpened = {isCheckedEnemy}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posStateEnemy =[+e.target.value,posStateEnemy[1]];   }} defaultValue = {posStateEnemy[0]}/>
            <Input onBlur={(e) =>{posStateEnemy =[posStateEnemy[0],+e.target.value];   }} defaultValue = {posStateEnemy[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Shrink</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{shrinkStateEnemy =[+e.target.value,shrinkStateEnemy[1]];   }} defaultValue = {shrinkStateEnemy[0]}/>
            <Input onBlur={(e) =>{shrinkStateEnemy =[shrinkStateEnemy[0],+e.target.value];   }} defaultValue = {shrinkStateEnemy[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureStateEnemy = e.target.value;   }} defaultValue = {textureStateEnemy}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityStateEnemy = +e.target.value;   }} defaultValue = {densityStateEnemy}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeStateEnemy = e.target.value;   }} defaultValue = {bodytypeStateEnemy}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Entity Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{entitytypeStateEnemy = e.target.value;   }} defaultValue = {entitytypeStateEnemy}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Cooldown</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{cooldownStateEnemy = +e.target.value;}} defaultValue = {cooldownStateEnemy}/>
        </InputGroup>
        <Button onClick = {() => {newEnemy()}}>Submit</Button>
        </Collapse>
        {/* end enemy inputs */}
        {/* begin platform inputs */}
        <Collapse isOpened = {isCheckedPlatform}>
        <Form inline>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {(e) => {platformType = 'capsule';}} type="radio" name="platformType" id="capsule" style = {{marginLeft: '8px'}} defaultChecked /> Capsule {' '} 
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {(e) => {platformType = 'diamond';}} type="radio" name="platformType" id="diamond" /> Diamond {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style = {itemTypeStyle}>
              <Input onChange = {(e) => {platformType = 'round';}} type="radio" name="platformType"  id="round" /> Round {' '} 
            </Label>
          </FormGroup>  
        </Form>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{nameStatePlatform = e.target.value;   }} defaultValue = {nameStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{posStatePlatform =[+e.target.value,posStatePlatform[1]];   }} defaultValue = {posStatePlatform[0]}/>
            <Input onBlur={(e) =>{posStatePlatform =[posStatePlatform[0],+e.target.value];   }} defaultValue = {posStatePlatform[1]}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureStatePlatform = e.target.value;   }} defaultValue = {textureStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{densityStatePlatform = +e.target.value;   }} defaultValue = {densityStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{bodytypeStatePlatform = e.target.value;   }} defaultValue = {bodytypeStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Friction</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{frictionStatePlatform = +e.target.value;   }} defaultValue = {frictionStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Restitution</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{restitutionStatePlatform = +e.target.value;   }} defaultValue = {restitutionStatePlatform}/>
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Space</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{spaceStatePlatform = +e.target.value;   }} defaultValue = {spaceStatePlatform}/>
        </InputGroup>
        <Button onClick = {() => {newPlatform(platformType)}}>Submit</Button>
        </Collapse>
      </UncontrolledCollapse>
    </div>
  );
}

export default AddButton;

