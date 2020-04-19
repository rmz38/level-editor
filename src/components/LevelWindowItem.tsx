// overflow: scroll;
import React, { Fragment, useState, ContextType } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import { DraggableCore } from 'react-draggable'; // <DraggableCore>
import { url } from 'inspector';
import Circle from './Circle'
import styles from './styles.module.css';

interface Props {
  texturePres?: string
  texturePast?: string
  idInput: string
  posInput: Array<number>
  updatePosInput: (a: Array<number>, idUpdate: string) => void
  centered: boolean
  scaleY: number
  scaleX: number
  lineX1?: number
  lineY1?: number
  lineX2?: number
  lineY2?: number
}


const LevelWindowItem: React.FC<Props> = ({ texturePres, texturePast, idInput, posInput, updatePosInput, centered, scaleY, scaleX, lineX1, lineY1, lineX2, lineY2 }) => {
  const [id, setId] = useState<string>(idInput);
  const [height, setHeight] = useState(90)
  const [width, setWidth] = useState(90)
  let temp: any;
  let x1 = (typeof lineX1 !== undefined) ? lineX1 : 0
  let x2 = (typeof lineX2 !== undefined) ? lineX2 : 10
  let y1 = (typeof lineY1 !== undefined) ? lineY1 : 0
  let y2 = (typeof lineY2 !== undefined) ? lineY2 : 10
  // let x1 = 0
  // let x2 = 10
  // let y1 = 0
  // let y2 = 10
  let coords = { x1, x2, y1, y2 }
  // let pxToGameCoord = (px:Array<number>) => {
  //   return [px[0] * world.bounds[0] / 1200, px[1] * world.bounds[1] / 600]
  // }
  // let testheight:number | undefined= 90;
  // let wrap = (n:number) => {
  //   testheight = n
  // }
  // (a: Array<number>, idUpdate: string) => void

  return (
    // updatePosInput takes a list of the new position values (calculated by adding drag pos to current pos) and name of the component
    // .008 * 600/18
    <div className={styles.DraggableItem}>
      <Draggable onStop={(e, data) => updatePosInput([(posInput[0] + data.x), posInput[1] - data.y], idInput)}>
        <img
          ref={el => temp = el}
          src={"./assets/" + texturePres + ".png"}
          style={{
            width: width * scaleX,
            height: height * scaleY + 'px',
            position: 'absolute',
            left: centered ? posInput[0] - width * scaleX / 2 : posInput[0],
            bottom: centered ? posInput[1] - height * scaleY / 2 : posInput[1]
          }}
          onLoad={(e) => { setWidth(temp.naturalWidth); setHeight(temp.naturalHeight); }}
          alt={texturePres}
        >
        </img>
      </Draggable>
      <div style={{
        zIndex: -1,
        width: width * scaleX + 'px',
        height: height * scaleY + 'px',
        position: 'absolute',
        left: (centered ? posInput[0] - width * scaleX / 2 : posInput[0] + width * scaleX / 2) + 'px',
        bottom: posInput[1] + 20 + 'px'
      }}>
        <svg>
          <line {...coords} stroke="black" strokeWidth='2'></line>
        </svg>
      </div>
      {/* <Draggable onStop = {(e,data) => updatePosInput([(posInput[0] + data.x),posInput[1] - data.y], idInput)}>
        <img ref = {el => temp = el} src = {"/assets/" + texturePres +".png"} style = {{position:'absolute', left:posInput[0], bottom: posInput[1]}}
         ></img>
    </Draggable> */}
    </div>

  );
}

export default LevelWindowItem;