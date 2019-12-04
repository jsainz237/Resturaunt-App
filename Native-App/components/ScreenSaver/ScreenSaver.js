// VENDOR
import React from 'react'
import { View, Text, Image, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// APP
import BackgroundImageGallery from '../BackgroundImageGallery/BackgroundImageGallery'
import backgroundImages from '../../utils/backgroundImages';
import styles from './ScreenSaver.scss'
import { updateCurrentPage } from '../AppNavigator/AppNavigator.reducer'
import Device from '../../utils/deviceDimensions'
const logoCircle = require('../../assets/images/logoCircle.png');

class ScreenSaver extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FontsLoaded: false,
        }
        this.circle_rotation_animation = new Animated.Value(0);
        this.logo_circle_height = this.logo_circle_width = 750;
        this.logo_circle_top_position = ((Device.height - 150) / 2) - (this.logo_circle_height / 2);
        this.logo_circle_left_position = (Device.width / 2) - (this.logo_circle_width / 2);
        
        this.goToHomePage = this.goToHomePage.bind(this);
        this.startCircleAnimation = this.startCircleAnimation.bind(this);

    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
            'Montserrat-Light': require('../../assets/fonts/Montserrat/Montserrat-Light.ttf'),
        })
        this.setState({ FontsLoaded: true });
        this.props.updateCurrentPage("ScreenSaver");
        this.startCircleAnimation();
    }

    goToHomePage() {
        const { navigate } = this.props.navigation;
        navigate('Menu')
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
                        <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.ginoLogoText}}>Gino's</Text>
                        <Text style={{ fontFamily: 'Montserrat-Light', ...styles.subLogoText}}>restaurant + bar</Text>
                    </View>
                </View>

                <View style={{ height: buttonContainerHeight, width: Device.width, ...styles.startTextContainer }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.startText}}>Touch to Start</Text>
                </View>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage))
    }
}

export default connect(null, mapDispatchToProps)(ScreenSaver);