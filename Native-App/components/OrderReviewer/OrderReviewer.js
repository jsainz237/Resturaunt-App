// VENDOR
import React from 'react'
import { Animated } from 'react-native'

// APP
import styles from './OrderReviewer.scss'
import Device from '../../utils/deviceDimensions'

/**
 * @name OrderReviewer
 * @param {Animated.Value} animated_X_translation
 */
class OrderReviewer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { animated_X_translation } = this.props;
        return (
            <Animated.View style={{ height: Device.height, right: animated_X_translation ? animated_X_translation : 0, ...styles.orderReviewer }} />
        )
    }
}

export default OrderReviewer;