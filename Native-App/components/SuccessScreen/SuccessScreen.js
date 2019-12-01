// VENDOR
import React from 'react'
import { View, Text, Image, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// APP
import styles from './SuccessScreen.styles.scss'
import { updateCurrentPage } from '../AppNavigator/AppNavigator.reducer'
import Device from '../../utils/deviceDimensions'
import { clearOrder } from '../OrderReviewer/OrderReviewer.reducer'
const logoCircle = require('../../assets/images/logoCircle.png');

class SuccessScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FontsLoaded: false,
            timer: 10,
        }
        this.timerRef = null;
        this.circle_rotation_animation = new Animated.Value(0);
        this.logo_circle_height = this.logo_circle_width = 750;
        this.logo_circle_top_position = ((Device.height - 150) / 2) - (this.logo_circle_height / 2);
        this.logo_circle_left_position = (Device.width / 2) - (this.logo_circle_width / 2);
        
        this.goToScreenSaver = this.goToScreenSaver.bind(this);
        this.startCircleAnimation = this.startCircleAnimation.bind(this);

    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('../../assets/fonts/Montserrat/Montserrat-Light.ttf'),
        })
        this.setState({ FontsLoaded: true });
        this.props.updateCurrentPage("SuccessScreen");
        this.startCircleAnimation();
        
        this.setState({ timer: this.state.timer -1 });
        this.timerRef = setInterval(() => this.setState({ timer: this.state.timer - 1 }), 1000);
    }

    goToScreenSaver() {
        const { navigate } = this.props.navigation;
        this.props.clearOrder();
        navigate('ScreenSaver')
    }

    startCircleAnimation() {
        Animated.loop(
            Animated.timing(this.circle_rotation_animation, {
                toValue: 1,
                duration: 80000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()
    }

    render() {
        const spinValue = this.circle_rotation_animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        })

        const buttonContainerHeight = Device.height - (Device.height - 150);

        if(this.state.timer === -1) {
            clearInterval(this.timerRef);
        }

        return !this.state.FontsLoaded ? null : (
            <View style={{ height: Device.height, width: Device.width, ...styles.wrapper}} onTouchEnd={() => this.goToHomePage()}>
                <View style={{ height: Device.height - 150, widht: Device.width, ...styles.logoContainer}}>
                    <Animated.Image 
                        source={logoCircle} 
                        style={{
                            transform: [{ rotate: spinValue }],
                            position: 'absolute',
                            zIndex: 100,
                            height: this.logo_circle_height,
                            width: this.logo_circle_width,
                            top: this.logo_circle_top_position,
                            left: this.logo_circle_left_position,
                        }}
                    />

                    <View style={styles.textContainer}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.successText}}>SUCCESS</Text>
                        <Text style={{ fontFamily: 'Montserrat-Light', ...styles.subSuccessText}}>Your order is being prepared</Text>

                    </View>
                </View>

                <View style={{ height: buttonContainerHeight, width: Device.width, ...styles.startTextContainer }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.returnText}}>returning to screenSaver in {this.state.timer}</Text>
                        {this.state.timer === -1 ? this.goToScreenSaver() : null }
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage)),
        clearOrder: () => dispatch(clearOrder())
    }
}

export default connect(null, mapDispatchToProps)(SuccessScreen);