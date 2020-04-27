// overflow: scroll;
import React, { Fragment, useState, ContextType } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import { DraggableCore } from 'react-draggable'; // <DraggableCore>
import styles from './styles.module.css';
import Tooltip from '@material-ui/core/Tooltip';

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
  angle?: number
}


const LevelWindowItem: React.FC<Props> = ({ texturePres, texturePast, idInput, posInput, updatePosInput, centered, scaleY, scaleX, lineX1, lineY1, lineX2, lineY2, angle }) => {
  const [id, setId] = useState<string>(idInput);
  const [height, setHeight] = useState(90)
  const [width, setWidth] = useState(90)
  let trackX = 0;
  let trackY = 0;
  let temp: any;
  let x1 = (typeof lineX1 !== undefined) ? lineX1 : 0
  let x2 = (typeof lineX2 !== undefined) ? lineX2 : 10
  let y1 = (typeof lineY1 !== undefined) ? lineY1 : 0
  let y2 = (typeof lineY2 !== undefined) ? lineY2 : 10
  let transAngle = (typeof angle !== undefined) ? angle : 0
  let transXRegex = /\.*translate\((.*?)px/i;
  let transYRegex = /\.*translate\(.*px,(.*?)px\)/i;
  let coords = { x1, x2, y1, y2 }

  return (
    // updatePosInput takes a list of the new position values (calculated by adding drag pos to current pos) and name of the component
    // .008 * 600/18
    <div className={styles.DraggableItem}>
      <Draggable onStop={(e, data) => updatePosInput([(posInput[0] + data.x), posInput[1] - data.y], idInput)}>
        <div style = {{
            width: width * scaleX,
            height: height * scaleY + 'px',
            position: 'absolute',
            left: centered ? posInput[0] - width * scaleX / 2 : posInput[0],
            bottom: centered ? posInput[1] - height * scaleY / 2 : posInput[1],
          }}>
        <Tooltip title = {id} aria-label= {id}>
          <img
            ref={el => temp = el}
            src={"./assets/" + texturePres + ".png"}
            style={{
              width: width * scaleX,
              height: height * scaleY + 'px',
              transform: 'rotate(' + transAngle + 'deg)'
            }}
            onLoad={(e) => { setWidth(temp.naturalWidth); setHeight(temp.naturalHeight);}}
            alt={texturePres}
          >
          </img>
        </Tooltip>
        </div>
      </Draggable>
      <div style={{
        zIndex: -1,
        width: width * scaleX + 'px',
        height: height * scaleY + 'px',
        position: 'absolute',
        left: (centered ? posInput[0] - width * scaleX / 3 : posInput[0] + width * scaleX / 3) + 'px',
        bottom: posInput[1] + 20 + 'px'
      }}>
        <svg>
          <line {...coords} stroke="black" strokeWidth='2'></line>
        </svg>
      </div>
    </div>
  );
}

export default LevelWindowItem;