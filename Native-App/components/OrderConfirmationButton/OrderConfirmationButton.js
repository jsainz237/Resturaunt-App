// VENDOR
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as Font from 'expo-font'
import { connect } from 'react-redux'

// APP
import styles from './OrderConfirmationButton.styles.scss'
const checkMark = require('../../assets/images/check-mark.png')

class OrderConfirmationButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            FontsLoaded: false,
        }

        this.mounted = false;
        this.totalPrice = 0;

        this.sendOrder = this.sendOrder.bind(this)
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

    async sendOrder(totalPrice) {
        return fetch(`${this.props.API_URL}/orders`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tableNum: this.props.TableNum,
                items: this.props.items.map(item => {
                    return {
                        name: item.name,
                        category: item.category,
                        quantity: item.quantity,
                        specialInstructions: item.specialInstructions ? item.specialInstructions.replace(/\n/g, " ") : null,
                    }
                }),
                total: totalPrice
            })
        })
            .then(res => res.json())
            .then(resJson => {
                this.props.goToSuccessScreen();
            })
            .catch(err => console.error(err))
    }

    componentDidUpdate() {
        this.totalPrice = 0;
        this.props.items.forEach(item => this.totalPrice += (item.quantity * item.price))
        this.totalPrice = this.totalPrice.toFixed(2);
    }

    render() {
        return !this.state.FontsLoaded ? null : (
            <TouchableOpacity onPress={() => this.sendOrder(this.totalPrice)} style={styles.button}>
                <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.buttonText }}>Confirm Order</Text>
                <Image source={checkMark} style={styles.checkMark} />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state, // for some reason items doesnt update unless this line is here
        items: state.Order.items,
        API_URL: state.Global.API_URL,
        TableNum: state.Global.TableNum
    }
}

export default connect(mapStateToProps)(OrderConfirmationButton);