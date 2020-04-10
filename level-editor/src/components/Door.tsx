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
}


const Door : React.FC<Props> = ({info, update,selected}) => {
  const{ pos, size, bodytype, density, friction, restitution, texturePres, texturePast} = info
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    selected('door', isOpen);
  }
  ;
  return (
    <div >
      <Button color="primary" onClick = {toggle} id="door" style={{ marginBottom: '1rem' }}>Door</Button>
      <Collapse isOpened={isOpen}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Position(x,y)</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:[+e.target.value, pos[1]], size:size, bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast})} defaultValue={pos[0]} />
          <Input onBlur={e =>update({ pos:[pos[0], +e.target.value], size:size, bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast})} defaultValue={pos[1]} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Size</InputGroupText>
          </InputGroupAddon>
          {/* TODO: change bounds input */}
          <Input onBlur={e =>update({ pos:pos, size:[+e.target.value,size[1]], bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast})} defaultValue={size[0]} />
          <Input onBlur={e =>update({ pos:pos, size:[size[0], +e.target.value], bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast})} defaultValue={size[1]} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Body Type</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:pos, size:size, bodytype:e.target.value, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast:texturePast})} defaultValue={bodytype} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Density</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>{update({ pos:pos, size:size, bodytype:bodytype, density:+e.target.value, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast:texturePast})}} defaultValue={density} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Friction</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:pos, size:size, bodytype:bodytype, density:density, 
            friction:+e.target.value, restitution:restitution, texturePres:texturePres, texturePast:texturePast})} defaultValue={friction} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Restitution</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:pos, size:size, bodytype:bodytype, density:density, 
            friction:friction, restitution:+e.target.value, texturePres:texturePres, texturePast:texturePast})} defaultValue={restitution} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Present Texture</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:pos, size:size, bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:e.target.value, texturePast:texturePast})} defaultValue={texturePres} />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Past Texture</InputGroupText>
          </InputGroupAddon>
          <Input onBlur={e =>update({ pos:pos, size:size, bodytype:bodytype, density:density, 
            friction:friction, restitution:restitution, texturePres:texturePres, texturePast:e.target.value})} defaultValue={texturePast} />
        </InputGroup>
      </Collapse>
    </div>
  );
}

export default Door;

// pos: [2.0, 10.0],
//     size: [1.92, 1.92],
//     bodyType: 'static',
//     density: 0.0,
//     friction: 0.0,
//     restitution: 0.0,
//     texturePres: 'goaldoorPres',
//     texturePast: 'goaldoorPast'