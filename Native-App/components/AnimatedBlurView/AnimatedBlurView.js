// VENDOR
import React from 'react'
import { BlurView } from 'expo-blur'
import { Animated } from 'react-native'

/**
 * @name AnimatedBlurView
 * @description - Animated blur view to animate opacity
 * @prop {Animated.Value} animated_opacity
 */
class AnimatedBlurView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { bgColor, animated_opacity } = this.props;
        return (
            <BlurView 
                style={{ height: '100%', width: '100%', backgroundColor: bgColor, opacity: animated_opacity }}
                tint='dark'
                intensity={90}
            />
        )
    }
}

export default Animated.createAnimatedComponent(AnimatedBlurView)

