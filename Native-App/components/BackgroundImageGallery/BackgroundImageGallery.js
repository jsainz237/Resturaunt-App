// VENDOR
import React from 'react'
import { Animated, Easing, Dimensions, View, StyleSheet, Text } from 'react-native'

// APP
import styles from './BackgroundImageGallery.scss'

/**
 * @name BackgroundImageGallery
 * @description Create an image gallery that rotates images in a loop
 * @prop {string} overlayColor - color of the overlay that goes on top of the images
 * @prop {array of pngs} images
 * @prop {function} goToNextPage - navigate function that will navigate to the specified next page
 * @prop children 
 */
export default class BackgroundImageGallery extends React.Component {
    constructor(props) {
        super(props);
        
        // get device dimensions
        this.deviceWidth = Dimensions.get('window').width;
        this.deviceHeight = Dimensions.get('window').height;

        // create an animationState object for each image passed in
        // in the form state.image1: {...}
        this.animationState = {};
        props.images.forEach((image, index) => {
            this.animationState[`image${index}`] = {
                
                // Animated.Value is a way to make a value animatable by react-native
                fadeAnimation: new Animated.Value(0),
                widthAnimation: new Animated.Value(this.deviceWidth),
                heightAnimation: new Animated.Value(this.deviceHeight),
            }
        })
    }

    createImageAnimation({fadeAnimation, widthAnimation, heightAnimation}, delay=0) {
        /**
         * configure animation for state object
         * 
         * parrallel means run animations at the same time,
         * sequence means run animation one after another
         * 
         * Animated.timing allows you to change the passed in animatable value to the 
         * specified toValue
         */
        return Animated.parallel([
            Animated.sequence([
                Animated.timing(fadeAnimation, {
                    delay: delay,
                    toValue: 1,
                    duration: 5000,
                }),
                Animated.timing(fadeAnimation, {
                    toValue: 0,
                    duration: 5000,
                })
            ]),
            Animated.parallel([
                Animated.timing(widthAnimation, {
                    delay: delay,
                    toValue: this.deviceWidth + 75,
                    easing: Easing.ease,
                    duration: 11000,
                }),
                Animated.timing(heightAnimation, {
                    delay: delay,
                    toValue: this.deviceHeight + 75,
                    easing: Easing.ease,
                    duration: 11000,
                })
            ]),
        ])
    }

    // This componentDidMount() function is a way to tell React to run when
    // the component is rendered
    componentDidMount() {

        // destructure props to map this.props.images to images
        const { images } = this.props;

        // create an animation for each image from props, and add delay so animations only overlap slightly
        animationsArr = images.map((image, index) => {
            const delay = 5000 * (index+1);
            return this.createImageAnimation(this.animationState[`image${index}`], delay);
        })

        // run all animations in parrallel, in a loop
        Animated.loop(
            Animated.parallel([...animationsArr])
        ).start()
    }

    render() {
        // destructure this.props
        const { images, overlayColor, goToNextPage, children } = this.props;
        
        return (
            <View style={styles.background} onTouchEnd={goToNextPage}>
                <View style={{
                    backgroundColor: overlayColor,
                    ...styles.imageOverlay
                    }}
                />

                {/* return array of Animated Image components for each image in props.images */}
                {images.map((image, index) => {
                    return (
                        <Animated.Image
                            style={{
                                // set style attributes to corresponding animated values
                                // i.e. opacity will change according to the value of fadeAnimation
                                opacity: this.animationState[`image${index}`].fadeAnimation,
                                height: this.animationState[`image${index}`].heightAnimation,
                                width: this.animationState[`image${index}`].widthAnimation,
                                ...styles.backgroundImage
                            }}
                            source={image}
                            resizeMethod='scale'
                            key={index}
                        />
                    )
                })}
                {/* props.children renders what were between the component tags in the calling component */}
                {children} 
            </View>
        )
    }
}

