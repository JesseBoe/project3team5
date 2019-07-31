import React, { Component } from 'react';
import Winwheel from './Winwheel';
import Style from './wheel.css'

class Wheel extends Component {
    constructor() {
        super();
        this.theWheel = null;;
    }
    componentDidMount() {
        this.theWheel = new Winwheel( {
            'canvasId'    : 'canvas',
            'lineWidth'   : 3,
            'numSegments' : 18,
            'strokeStyle' : '#fcfbfe', 
            'direction'    : 'clockwise',
            'repeat'       : 0,
            'textAlignment'  : 'center',
            'textOrientation' : 'vertical',    // Set orientation. horizontal, vertical, curved.
            'textFontFamily'  : 'verdana',     // Monospace font best for vertical and curved.
            'textFontSize'    : 24,
            'outerRadius'  : 220, 
            'centerX'     : 250,    
            'centerY'     : 255,
            'rotationAngle'   : 0, 
            'innerRadius'   : 75,  
            'animation' :
            {
                'type'     : 'spinToStop',
                'duration' : 3,
                'spins'    : 9,
                'callbackFinished' : this.spinResult
            },
            'segments'    :
            [   
                {'fillStyle' : '#000000', 'textFontSize' : 14, 'textFillStyle' : '#ffffff', 'text' : '  BANKRUPT'},
                {'fillStyle' : '#7649fe', 'text' : '500'},
                {'fillStyle' : '#0c164f', 'textFillStyle' : '#ffffff', 'text' : '800'}, 
                {'fillStyle' : '#5643fd', 'text' : '600'},
                {'fillStyle' : '#ba1e68', 'text' : '300'},
                {'fillStyle' : '#1d1135', 'textFillStyle' : '#ffffff', 'text' : '400'},
                {'fillStyle' : '#ffffff', 'textFontSize' : 14, 'text' : ' LOSE TURN'},
                {'fillStyle' : '#7649fe', 'text' : '900'},
                {'fillStyle' : '#0c164f', 'textFillStyle' : '#ffffff', 'text' : '700'}, 
                {'fillStyle' : '#5643fd', 'text' : '600'},
                {'fillStyle' : '#ba1e68', 'text' : '800'},
                {'fillStyle' : '#1d1135', 'textFillStyle' : '#ffffff', 'text' : '500'},
                {'fillStyle' : '#000000', 'textFontSize' : 14, 'textFillStyle' : '#ffffff', 'text' : '  BANKRUPT'},
                {'fillStyle' : '#7649fe', 'text' : '1000'}, 
                {'fillStyle' : '#0c164f', 'textFillStyle' : '#ffffff', 'text' : '400'},
                {'fillStyle' : '#5643fd', 'text' : '700'},
                {'fillStyle' : '#ba1e68', 'text' : '900'},
                {'fillStyle' : '#1d1135', 'textFillStyle' : '#ffffff', 'text' : '2500'}
            ],
            'pointerGuide' :  
            {
                'display'     : true,
                'strokeStyle' : 'yellow',
                'lineWidth'   : 3
            },
            'pins' : 
            {
                'number'      : 36,
                'outerRadius' : 3,
                'margin'      : 5,
                'fillStyle'   : 'black',
                'strokeStyle' : 'white'
            }
        });
    }

    spinWheel = () => {
        this.theWheel.rotationAngle = (this.theWheel.rotationAngle % 360); 
        this.theWheel.startAnimation();
    }

    spinResult = () => {
        let prizeSegment = this.theWheel.getIndicatedSegment();
        if (prizeSegment.text === '  BANKRUPT') {
            alert("OMG. You've gone Bankrupt!");
        } else if (prizeSegment.text === 'BANKRUPT') {
            alert("You've lost your turn ");
        } else {
            alert("You have won " + prizeSegment.text);       
        }
    }
    render() {
        return (
          <div>
                <div id="canvasContainer">
                    <canvas id="canvas" width="500" height="500">
                        Canvas not supported, use another browser.
                    </canvas>
                    <img id="prizePointer" src={require('../../images/basic_pointer.png')} alt="Wheel Pointer" />
                </div>
                {/* <div id="spinButton" className="spacer">
                    <button className="btn btn-primary spinBtn" onClick={this.spinWheel}>Spin the Wheel</button>
                </div> */}
            </div>
        )
    }
}
// theWheel.draw();
export default Wheel;