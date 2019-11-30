// VENDOR
import React from 'react'
import { Image, View, Animated, Easing } from 'react-native'

// APP
import styles from './Checkout.scss'
import DeviceSafeMargins from '../../utils/DeviceSafeMargins'

// APP-COMPONENTS
import Overlay from '../Overlay/Overlay'
import OrderReviewer from '../OrderReviewer/OrderReviewer'

const receiptImage = require('../../assets/images/invoice.png');

/**
 * @name Checkout
 * @description When clicked, will pull out order review bar and show backdrop
 */
class Checkout extends React.Component {
    constructor() {
        super();

        this.state = {
            open: false,
        }

        this.animated_opacity = new Animated.Value(0);
        this.animated_X_translation = new Animated.Value(-1000);

        this.startOpenAnimation = this.startOpenAnimation.bind(this);
        this.startCloseAnimation = this.startCloseAnimation.bind(this);
    }

    // start animation of opening the order reviewer
    startOpenAnimation() {
        Animated.parallel([
            // animate moving order reviewer
            Animated.timing(this.animated_X_translation, {
                toValue: 0,
                duration: 500,
                easing: Easing.bezier(.39, .01, .59, 1)
            }), 
            // animate opacity of overlay
            Animated.timing(this.animated_opacity, {
                toValue: 1,
                duration: 500,
                easing: Easing.bezier(.39, .01, .59, 1)
            }),
        ])
        .start()
    }

    // start animation of closing the order reviewer
    startCloseAnimation() {
        Animated.parallel([
            // animate moving order reviewer
            Animated.timing(this.animated_X_translation, {
                toValue: -1000,
                duration: 500,
                easing: Easing.bezier(.39, .01, .59, 1)
            }),
            // animate opacity of overlay
            Animated.timing(this.animated_opacity, {
                toValue: 0,
                duration: 500,
                easing: Easing.bezier(.39, .01, .59, 1)
            }),
        ])
        .start(() => this.setState({ open: false }))
        // after the animation is over, set component state to false
    }

    render() {
        const { open } = this.state;
        return (
            <View style={styles.checkoutWrapper}>
                
                <OrderReviewer animated_X_translation={this.animated_X_translation} />

                { open ? 
                    <Overlay bgColor='black' onTouch={this.startCloseAnimation} animated_opacity={this.animated_opacity} /> : 
                    null
                }

                {/* Green Checkout button */}
                <View 
                    style={{ marginTop: DeviceSafeMargins.iPad.top, ...styles.checkoutContainer}} 
                    onTouchEnd={() => this.setState({ open: true }, () => this.startOpenAnimation()) }
                >
                    <Image source={receiptImage} style={styles.checkoutIcon} />
                </View>
            </View>
        )
    } 
}

export default Checkout;