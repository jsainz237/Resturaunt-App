// VENDOR
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as Font from 'expo-font'

// APP
import styles from './OrderConfirmationButton.styles.scss'
const checkMark = require('../../assets/images/check-mark.png')

class OrderConfirmationButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            FontsLoaded: false
        }

        this.mounted = false;
    }

    async componentDidMount() {
        this.mounted = true;
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        })

        this.mounted ? this.setState({ FontsLoaded: true }) : null;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return !this.state.FontsLoaded ? null : (
            <TouchableOpacity onPress={() => alert("HI")} style={styles.button}>
                <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.buttonText }}>Confirm Order</Text>
                <Image source={checkMark} style={styles.checkMark} />
            </TouchableOpacity>
        )
    }
}

export default OrderConfirmationButton