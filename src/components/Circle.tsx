import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';
import Draggable from 'react-draggable'; // The default
import {DraggableCore} from 'react-draggable'; // <DraggableCore>
import { url } from 'inspector';
import { isAbsolute } from 'path';

interface Props {
  posLeft: number,
  posBottom: number
}
const Circle:React.FC<Props> = (posLeft, posBottom) => {
    let circleStyle = {
        position: 'absolute' as 'absolute',
        backgroundColor: '#ffffff',
        opacity: 0.5,
        borderRadius: "50%",
        width:100,
        height:100,
        left: posLeft + 'px',
        bottom: posBottom + 'px'
    }
    return (
    <div style={circleStyle}>
    </div>
    )
}

export default Circle