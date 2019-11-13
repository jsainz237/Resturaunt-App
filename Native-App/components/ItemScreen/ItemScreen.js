// VENDOR
import React from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { BlurView } from 'expo-blur'
import { connect } from 'react-redux'

// APP
import Overlay from '../Overlay/Overlay'
import { toggleItemScreen } from './ItemScreen.reducer'
import styles from './ItemScreen.styles.scss'
import deviceDimensions from '../../utils/deviceDimensions'

class ItemScreen extends React.Component {
    constructor(props) {
        super(props);

        this.animatedOpacity = new Animated.Value(0);
        this.componentDimensions = {
            height: 640,
            width: 845
        }
        this.positions = {
            top: ( deviceDimensions.height / 2 ) - ( this.componentDimensions.height / 2 ),
            left: ( deviceDimensions.width / 2 ) - ( this.componentDimensions.width / 2 )
        }

        this.startClosingAnimations = this.startClosingAnimations.bind(this)
    }

    componentDidMount() {
        // animate opacity of overlay
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(.39, .01, .59, 1)
        }).start()
    }

    startClosingAnimations() {
        // animate opacity of overlay
        Animated.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.bezier(.39, .01, .59, 1)
        }).start(() => this.props.toggleItemScreen())
    }

    render() {
        return (
            <View style={styles.itemScreenWrapper}>
                <Overlay bgColor='white' animated_opacity={this.animatedOpacity} onTouch={this.startClosingAnimations} />
                <View style={{ 
                    top: this.positions.top,
                    left: this.positions.left,
                    height: this.componentDimensions.height,
                    width: this.componentDimensions.width,
                    ...styles.itemContainer
                }}>
                    <View style={styles.specifications}>

                    </View>
                    <View style={styles.addButton}>

                    </View>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleItemScreen: (item) => dispatch(toggleItemScreen(item))
    }
}

export default connect(null, mapDispatchToProps)(ItemScreen)