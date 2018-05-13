import * as React from 'react';
import * as d3 from 'd3';

const pathStyle: any = {
    fill: 'none',
    strokeWidth: 2,
    stroke: '#5e6870',
    strokeDashoffset: 0,
    strokeDasharray: 300,
    transition: 'all 0.6s',
};

const svgStyle: any = {
    position: 'absolute',
    left: '100px',
    top: '100px',
    cursor: 'none',
};

const lineStyle: any = {
    stroke: 'black',
    strokeWidth: 3
};

export default class CirclePlus extends React.Component {
    constructor(props) {
        super(props);

        let ss: any = document.styleSheets[0];
        ss.insertRule('svg:hover path{ stroke-dashoffset: 300 !important; cursor: none}');

        console.log(d3.path())
    }

    render() {
        return (
            <svg width='52' height='52' style={svgStyle}>
                <path style={pathStyle} d="M1,26a25,25 0 1,0 50,0a25,25 0 1,0 -50,0"></path>
                <g>
                <line x1='26' y1='16' x2='26' y2='36' style={lineStyle}/>
                <line x1='16' y1='26' x2='36' y2='26' style={lineStyle}/>
                </g>
            </svg>
        );
    }
}