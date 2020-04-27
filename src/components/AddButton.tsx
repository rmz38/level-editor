import { UncontrolledCollapse, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import React, { createRef, Fragment, useState } from 'react'
import { Collapse } from 'react-collapse';
import { UncontrolledDropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
// ES6


interface Props {
  gameObjects: any
  updateTurret: (data: any, id: string) => void
  updateEnemy: (data: any, id: string) => void
  updatePlatform: (data: any, id: string, type: string) => void
  updateNumPlat: (n: number) => void
  updateSpike: (data: any, id: string) => void
  numPlat: number
  // selected: (compName:string, open:boolean) => void
}

const AddButton: React.FC<Props> = ({ gameObjects, updateTurret, updateEnemy, updatePlatform, numPlat, updateNumPlat, updateSpike }) => {
  let { avatar, world, door, turrets, diamonds, rounds, enemies, capsules } = gameObjects
  const [isCheckedTurret, setIsCheckedTurret] = useState(true);
  const [isCheckedEnemy, setIsCheckedEnemy] = useState(false);
  const [isCheckedPlatform, setIsCheckedPlatform] = useState(false);
  const [isCheckedSpike, setIsCheckedSpike] = useState(false);
  const [isCheckedCapsule, setIsCheckedCapsule] = useState(false);
  const [isCheckedDiamond, setIsCheckedDiamond] = useState(false);
  const [isCheckedRound, setIsCheckedRound] = useState(false);
  // const [numPlatforms, setNumPlatforms] =useState(numPlat)
  const [init, setInit] = useState(true);

  let openTurret = () => {
    setIsCheckedEnemy(false);
    setIsCheckedTurret(true);
    setIsCheckedPlatform(false);
    setIsCheckedSpike(false);
  }
  let openEnemy = () => {
    setIsCheckedEnemy(true);
    setIsCheckedTurret(false);
    setIsCheckedPlatform(false);
    setIsCheckedSpike(false);
  }
  let openPlatform = () => {
    setIsCheckedEnemy(false);
    setIsCheckedTurret(false);
    setIsCheckedPlatform(true);
    setIsCheckedSpike(false);
  }
  let openSpike = () => {
    setIsCheckedEnemy(false);
    setIsCheckedTurret(false);
    setIsCheckedPlatform(false);
    setIsCheckedSpike(true);
  }
  // let openCapsule = () => {
  //   openPlatform()

  // }

  //turret states 
  let posStateTurret = [17, 9]
  let shrinkStateTurret = [0.0168, 0.021375]
  let textureStateTurret = 'turret_present'
  let densityStateTurret = 1.0
  let bodytypeStateTurret = 'static'
  let entitytypeStateTurret = 'present'
  let cooldownStateTurret = 360
  let directionStateTurret = [-3, 0]

  //enemy states
  let posStateEnemy = [17, 9]
  let shrinkStateEnemy = [0.0168, 0.021375]
  let textureStateEnemy = 'enemypresent'
  let densityStateEnemy = 1.0
  let bodytypeStateEnemy = 'dynamic'
  let entitytypeStateEnemy = 'present'
  let cooldownStateEnemy = 120
  let aitypeStateEnemy = 1

  //platform states 
  let platformType = 'capsule'
  let nameStatePlatform = 'present_capsule'
  let posStatePlatform = [17, 9]
  let bodytypeStatePlatform = 'static'
  let densityStatePlatform = 0.0
  let frictionStatePlatform = .6
  let restitutionStatePlatform = .1
  let textureStatePlatform = 'present_capsule'
  let spaceStatePlatform = 1

  //spike states
  let posStateSpike = [6.1, 5.5]
  let bodytypeStateSpike = "static"
  let densityStateSpike = 0.0
  let frictionStateSpike = 0.6
  let restitutionStateSpike = 0.1 
  let textureStateSpike = "spikes"
  let spaceStateSpike = 1
  let angleStateSpike = 0

  let newTurret = () => {
    let newKey = 'turret'
    let newTurret = {
      pos: posStateTurret,
      shrink: shrinkStateTurret,
      texture: textureStateTurret,
      density: densityStateTurret,
      bodytype: bodytypeStateTurret,
      entitytype: entitytypeStateTurret,
      cooldown: cooldownStateTurret,
      direction: directionStateTurret
    }
    updateTurret(newTurret, newKey)
  }
  let newEnemy = () => {
    let newKey = 'enemy'
    let newEnemy = {
      pos: posStateEnemy,
      shrink: shrinkStateEnemy,
      texture: 'enemy' + entitytypeStateEnemy,
      density: densityStateEnemy,
      bodytype: bodytypeStateEnemy,
      entitytype: entitytypeStateEnemy,
      cooldown: cooldownStateEnemy,
      aitype: aitypeStateEnemy
    }
    updateEnemy(newEnemy, newKey)
  }
  let newSpike = () => {
    let newKey = 'spike'
    let newSpike = {
      pos: posStateSpike,
      bodytype: bodytypeStateSpike,
      density: densityStateSpike,
      friction: frictionStateSpike,
      restitution: restitutionStateSpike,
      texture: textureStateSpike,
      space: spaceStateSpike,
      angle: angleStateSpike,
    }
    updateSpike(newSpike, newKey)
  }
  let newPlatform = (type: string) => {
    let time = 'bugHappened'
    let newKey = 'bugHappened'
    if (spaceStatePlatform === 1) {
      time = 'present'
    } else if (spaceStatePlatform === 2) {
      time = 'past'
    } else if (spaceStatePlatform === 3) {
      time = 'both'
    } else {
      time = 'bugNotPastPres'
    }

    newKey = time + type
    let newPlatform = {
      name: time + "_" + platformType,
      pos: posStatePlatform,
      bodytype: bodytypeStatePlatform,
      density: densityStatePlatform,
      friction: frictionStatePlatform,
      restitution: restitutionStatePlatform,
      texture: time + "_" + platformType,
      space: spaceStatePlatform
    }
    updateNumPlat(numPlat + 1)
    updatePlatform(newPlatform, newKey, platformType)
  }

  let itemTypeStyle = {
    marginLeft: '5px'
  };
  return (
    <div >
      <Button color="secondary" id="toggler" style={{ width: '100%', backgroundColor: '#fa511e', marginBottom: '2em' }}>Add</Button>
      <UncontrolledCollapse style={{ marginBottom: '2em' }} toggler="#toggler">
        <Form inline>
          <FormGroup >
            <Label check inline style={itemTypeStyle}>
              <Input onChange={() => { openTurret() }} type="radio" name="itemType" id="itemTypeTurret" style={{ marginLeft: '8px' }} defaultChecked /> Turret {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style={itemTypeStyle}>
              <Input onChange={() => { openEnemy() }} type="radio" name="itemType" id="itemTypeEnemy" /> Enemy {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style={itemTypeStyle}>
              <Input onChange={() => { openPlatform() }} type="radio" name="itemType" id="itemTypePlatform" /> Platform {' '}
            </Label>
          </FormGroup>
          <FormGroup >
            <Label check inline style={itemTypeStyle}>
              <Input onChange={() => { openSpike() }} type="radio" name="itemType" id="itemTypePlatform" /> Spike {' '}
            </Label>
          </FormGroup>
        </Form>
        {/* turret inputs */}
        <Collapse isOpened={isCheckedTurret}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Position</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { posStateTurret = [+e.target.value, posStateTurret[1]]; }} defaultValue={posStateTurret[0]} />
            <Input onBlur={(e) => { posStateTurret = [posStateTurret[0], +e.target.value]; }} defaultValue={posStateTurret[1]} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Shrink</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { shrinkStateTurret = [+e.target.value, shrinkStateTurret[1]]; }} defaultValue={shrinkStateTurret[0]} />
            <Input onBlur={(e) => { shrinkStateTurret = [shrinkStateTurret[0], +e.target.value]; }} defaultValue={shrinkStateTurret[1]} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Texture</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { textureStateTurret = e.target.value; }} defaultValue={textureStateTurret} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Density</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { densityStateTurret = +e.target.value; }} defaultValue={densityStateTurret} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Body Type</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { bodytypeStateTurret = e.target.value; }} defaultValue={bodytypeStateTurret} />
          </InputGroup>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { entitytypeStateTurret = 'present'; textureStateTurret = "turret_" + entitytypeStateTurret }} type="radio" name="entitytypeTurret" id="present" style={{ marginLeft: '8px' }} defaultChecked /> Present {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { entitytypeStateTurret = 'past'; textureStateTurret = 'turret_' + entitytypeStateTurret }} type="radio" name="entitytypeTurret" id="past" /> Past {' '}
              </Label>
            </FormGroup>
          </Form>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Cooldown</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { cooldownStateTurret = +e.target.value; }} defaultValue={cooldownStateTurret} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Direction</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { directionStateTurret = [+e.target.value, directionStateTurret[1]]; }} defaultValue={directionStateTurret[0]} />
            <Input onBlur={(e) => { directionStateTurret = [directionStateTurret[0], +e.target.value]; }} defaultValue={directionStateTurret[1]} />
          </InputGroup>
          <Button onClick={() => { newTurret() }}>Submit</Button>
        </Collapse>
        {/* end turret inputs */}
        {/* begin enemy inputs */}
        <Collapse isOpened={isCheckedEnemy}>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { entitytypeStateEnemy = 'present'; }} type="radio" name="entitytypeEnemy" id="present" style={{ marginLeft: '8px' }} defaultChecked /> Present {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { entitytypeStateEnemy = 'past'; }} type="radio" name="entitytypeEnemy" id="past" /> Past {' '}
              </Label>
            </FormGroup>
          </Form>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Position</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { posStateEnemy = [+e.target.value, posStateEnemy[1]]; }} defaultValue={posStateEnemy[0]} />
            <Input onBlur={(e) => { posStateEnemy = [posStateEnemy[0], +e.target.value]; }} defaultValue={posStateEnemy[1]} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Shrink</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { shrinkStateEnemy = [+e.target.value, shrinkStateEnemy[1]]; }} defaultValue={shrinkStateEnemy[0]} />
            <Input onBlur={(e) => { shrinkStateEnemy = [shrinkStateEnemy[0], +e.target.value]; }} defaultValue={shrinkStateEnemy[1]} />
          </InputGroup>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { aitypeStateEnemy = 1; }} type="radio" name="aitypeEnemy"style={{ marginLeft: '8px' }} defaultChecked /> Walk {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { aitypeStateEnemy = 2; }} type="radio" name="aitypeEnemy"/> Teleport{' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { aitypeStateEnemy = 3; }} type="radio" name="aitypeEnemy"/> Gun{' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { aitypeStateEnemy = 4; }} type="radio" name="aitypeEnemy"/> Fly{' '}
              </Label>
            </FormGroup>
          </Form>
          {/* <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureStateEnemy = e.target.value;   }} defaultValue = {textureStateEnemy}/>
        </InputGroup> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Density</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { densityStateEnemy = +e.target.value; }} defaultValue={densityStateEnemy} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Body Type</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { bodytypeStateEnemy = e.target.value; }} defaultValue={bodytypeStateEnemy} />
          </InputGroup>
          {/* <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Entity Type</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{entitytypeStateEnemy = e.target.value;   }} defaultValue = {entitytypeStateEnemy}/>
        </InputGroup> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Cooldown</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { cooldownStateEnemy = +e.target.value; }} defaultValue={cooldownStateEnemy} />
          </InputGroup>
          <Button onClick={() => { newEnemy() }}>Submit</Button>
        </Collapse>
        {/* end enemy inputs */}
        {/* begin platform inputs */}
        <Collapse isOpened={isCheckedPlatform}>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'capsule'; }} type="radio" name="platformType" id="capsule" style={{ marginLeft: '8px' }} defaultChecked /> Capsule {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'diamond'; }} type="radio" name="platformType" id="diamond" /> Diamond {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'round'; }} type="radio" name="platformType" id="round" /> Round {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'tall'; }} type="radio" name="platformType" id="round" /> Tall {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'longcapsule'; }} type="radio" name="platformType" id="round" /> Longcapsule {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { platformType = 'pillar'; }} type="radio" name="platformType" id="round" /> Pillar {' '}
              </Label>
            </FormGroup>
          </Form>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { spaceStatePlatform = 1; }} type="radio" name="space" id="present" style={{ marginLeft: '8px' }} defaultChecked /> Present {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { spaceStatePlatform = 2; }} type="radio" name="space" id="past" /> Past {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { spaceStatePlatform = 3; }} type="radio" name="space" id="Both" /> Both {' '}
              </Label>
            </FormGroup>
          </Form>
          {/* <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Name</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{nameStatePlatform = e.target.value;   }} defaultValue = {nameStatePlatform}/>
        </InputGroup> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Position</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { posStatePlatform = [+e.target.value, posStatePlatform[1]]; }} defaultValue={posStatePlatform[0]} />
            <Input onBlur={(e) => { posStatePlatform = [posStatePlatform[0], +e.target.value]; }} defaultValue={posStatePlatform[1]} />
          </InputGroup>
          {/* <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Texture</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{textureStatePlatform = e.target.value;   }} defaultValue = {textureStatePlatform}/>
        </InputGroup> */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Density</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { densityStatePlatform = +e.target.value; }} defaultValue={densityStatePlatform} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Body Type</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { bodytypeStatePlatform = e.target.value; }} defaultValue={bodytypeStatePlatform} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Friction</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { frictionStatePlatform = +e.target.value; }} defaultValue={frictionStatePlatform} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Restitution</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { restitutionStatePlatform = +e.target.value; }} defaultValue={restitutionStatePlatform} />
          </InputGroup>
          {/* <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Space</InputGroupText>
          </InputGroupAddon>
            <Input onBlur={(e) =>{spaceStatePlatform = +e.target.value;   }} defaultValue = {spaceStatePlatform}/>
        </InputGroup> */}
          <Button onClick={() => { newPlatform(platformType) }}>Submit</Button>
        </Collapse>
        <Collapse isOpened={isCheckedSpike}>
          <Form inline>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { spaceStateSpike = 1; }} type="radio" name="space" id="present" style={{ marginLeft: '8px' }} defaultChecked /> Present {' '}
              </Label>
            </FormGroup>
            <FormGroup >
              <Label check inline style={itemTypeStyle}>
                <Input onChange={(e) => { spaceStateSpike = 2; }} type="radio" name="space" id="past" /> Past {' '}
              </Label>
            </FormGroup>
          </Form>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Position</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { posStateSpike = [+e.target.value, posStateSpike[1]]; }} defaultValue={posStateSpike[0]} />
            <Input onBlur={(e) => { posStateSpike = [posStateSpike[0], +e.target.value]; }} defaultValue={posStateSpike[1]} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Density</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { densityStateSpike = +e.target.value; }} defaultValue={densityStateSpike} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Body Type</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { bodytypeStateSpike = e.target.value; }} defaultValue={bodytypeStateSpike} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Friction</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { frictionStateSpike = +e.target.value; }} defaultValue={frictionStateSpike} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Restitution</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { restitutionStateSpike = +e.target.value; }} defaultValue={restitutionStateSpike} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Texture</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { textureStateSpike = e.target.value; }} defaultValue={textureStateSpike} />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Angle</InputGroupText>
            </InputGroupAddon>
            <Input onBlur={(e) => { angleStateSpike = +e.target.value; }} defaultValue={angleStateSpike} />
          </InputGroup>
          <Button onClick={() => { newSpike() }}>Submit</Button>
        </Collapse>
      </UncontrolledCollapse>
    </div>
  );
}

export default AddButton;

