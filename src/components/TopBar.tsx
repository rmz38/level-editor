// overflow: scroll;
import React, { Fragment, useState } from 'react'
import { string } from 'prop-types';
import CSS from 'csstype';

// interface Props {
//     text: string;
// }
const windowStyling : CSS.Properties= {
    height: '800px',
    width: '600px',
    background: '#aaaaaa',
    float: 'right'
}

const TopBar : React.FC = ({}) => {
  
  return (
    <div className="ItemDashboard" style = {windowStyling}>
        ItemDashboard
    </div>
  );
}

export default TopBar;
