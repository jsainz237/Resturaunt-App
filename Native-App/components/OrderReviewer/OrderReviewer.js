// VENDOR
import React from 'react'
import { Animated, Text, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// APP
import styles from './OrderReviewer.scss'
import Device from '../../utils/deviceDimensions'
import OrderConfirmationButton from '../OrderConfirmationButton/OrderConfirmationButton'
import { removeItemFromOrder } from './OrderReviewer.reducer'

/**
 * @name OrderReviewer
 * @param {Animated.Value} animated_X_translation
 */
class OrderReviewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FontsLoaded: false,
        }
        this.mounted = false;
        
        this.renderOrderItems = this.renderOrderItems.bind(this);
    }

    async componentDidMount() {
        this.mounted = true;
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
            'Montserrat-SemiBold': require('../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
        })
        this.mounted ? this.setState({ FontsLoaded: true }) : null;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderOrderItems() {
        const items = this.props.orderItems.map((item, index) => {
            const itemTotalPrice = (item.quantity * item.price).toFixed(2)
            const spaceChar = itemTotalPrice >= 10.00 ? "" : " "
            return (
                <View style={styles.itemWrapper} key={index}>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', ...styles.item }}>
                        {`\u2022`} {item.name}
                    </Text>
                    <Text style={{ fontFamily: 'Montserrat-SemiBold', ...styles.item }}>
                        x {item.quantity}  -  {spaceChar}${itemTotalPrice}
                    </Text>
                </View>
            )
        })
        return items;
    }

    render() {
        const { animated_X_translation, orderItems, goToSuccessScreen } = this.props;
        let totalPrice = 0;
        orderItems.forEach(item => totalPrice += (item.quantity * item.price));
        totalPrice = totalPrice.toFixed(2);

        return !this.state.FontsLoaded ? null : (
            <Animated.View style={{ height: Device.height, right: animated_X_translation ? animated_X_translation : 0, ...styles.orderReviewer }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25 }}>Review your Order</Text>
                <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, ...styles.orderItems }}>
                    <ScrollView showsVerticalScrollIndicator >
                        {this.renderOrderItems()}
                    </ScrollView>
                </View>
                <View style={styles.totalWrapper}>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25 }}>Total:</Text>
                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25 }}>${totalPrice}</Text>
                </View>
                <OrderConfirmationButton goToSuccessScreen={goToSuccessScreen} />
            </Animated.View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state: state, // for some reason, orderItems won't update without this...
        orderItems: state.Order.items,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItemFromOrder: (item) => dispatch(removeItemFromOrder(item)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderReviewer);