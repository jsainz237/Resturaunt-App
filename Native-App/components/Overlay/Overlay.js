// VENDOR
import React from 'react'
import { View, Animated } from 'react-native'

// APP
import styles from './Overlay.scss'
import Device from '../../utils/deviceDimensions'
import AnimatedBlurView from '../AnimatedBlurView/AnimatedBlurView'

/**
 * @name Overlay
 * @description overlay to appear when the review bar is open
 * @param {valid color} bgColor - color that the overlay should appear
 * @param {function} onTouch - function that starts the closing animations
 * @param {Animated.Value} animated_opacity - animated value for opacity
 */
class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }
        
    render() {
        const { bgColor, onTouch, animated_opacity } = this.props;
        return (
            <View 
                style={{ height: Device.height, width: Device.width, ...styles.overlayWrapper}} 
                onTouchEnd={() => onTouch()}
            >
                <AnimatedBlurView bgColor={bgColor} animated_opacity={animated_opacity}/>
            </View>
        )
    }
}

export default Overlay