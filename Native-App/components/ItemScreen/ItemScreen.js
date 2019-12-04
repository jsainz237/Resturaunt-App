// VENDOR
import React from 'react'
import { View, Text, Animated, Easing, TextInput, Keyboard, Image, TouchableOpacity } from 'react-native'
import { BlurView } from 'expo-blur'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// APP
import Overlay from '../Overlay/Overlay'
import { toggleItemScreen } from './ItemScreen.reducer'
import styles from './ItemScreen.styles.scss'
import deviceDimensions from '../../utils/deviceDimensions'
import { addItemToOrder } from '../OrderReviewer/OrderReviewer.reducer'

/**
 * @name ItemScreen
 * @description Show Item Specifications Screen once user selects item from menu
 * @param {Object} item
 */
class ItemScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemAdded: false,
            textInputActive: false,
            specialInstructions: this.initialSpecialInstructionText,
            FontsLoaded: false,
            quantity: 1
        }

        this.initialSpecialInstructionText = "Enter special instructions here..."
        this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => this.toggleTextInput(false));
        this.animatedOpacity = new Animated.Value(0);
        this.componentDimensions = {
            height: 640,
            width: 845
        }
        this.positions = {
            top: ( deviceDimensions.height / 2 ) - ( this.componentDimensions.height / 2 ),
            left: ( deviceDimensions.width / 2 ) - ( this.componentDimensions.width / 2 )
        }

        this.close = this.close.bind(this)
        this.onChangeText = this.onChangeText.bind(this)
        this.toggleTextInput = this.toggleTextInput.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
        this.addToOrder = this.addToOrder.bind(this)
    }

    async componentDidMount() {
        // animate opacity of overlay
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(.39, .01, .59, 1)
        }).start()

        await Font.loadAsync({
            'Montserrat-Medium': require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
            'Montserrat-SemiBold': require('../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
            'Montserrat-Regular': require('../../assets/fonts/Montserrat/Montserrat-Regular.ttf')
        })
        this.setState({ FontsLoaded: true });
    }

    componentWillUnmount() {
        this.keyboardDidHide.remove();
    }

    close() {
        // if keyboard is open, and 
        if (this.state.textInputActive) {
            Keyboard.dismiss();
            this.toggleTextInput(false)
            return;
        }

        // animate opacity of overlay
        Animated.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 500,
            easing: Easing.bezier(.39, .01, .59, 1)
        }).start(() => this.props.toggleItemScreen())
    }

    onChangeText(text) {
        this.setState({ specialInstructions: text });
    }

    toggleTextInput(active) {
        this.setState({ textInputActive: active });
    }

    changeQuantity(quantity) {
        if( quantity !== 0 && quantity !== 10 )
            this.setState({ quantity })
    }

    addToOrder(item) {
        this.props.addItemToOrder(item);
        this.setState({ itemAdded: true })
    }

    render() {
        const { item } = this.props;
        const { specialInstructions, quantity, textInputActive, itemAdded } = this.state;
        const topPosition = textInputActive ? this.positions.top - 200 : this.positions.top;
        const totalPrice = quantity * item.price;

        return !this.state.FontsLoaded ? null : (
            <Animated.View style={{ ...styles.itemScreenWrapper }}>
                <Overlay bgColor='white' animated_opacity={this.animatedOpacity} onTouch={this.close} />
                { textInputActive ? null : 
                    <Animated.Image 
                        source={require('../../assets/images/X-icon.png')} 
                        style={{ opacity: this.animatedOpacity, ...styles.xIcon}} 
                        onTouchEnd={() => this.close()} 
                    /> 
                }

                <Animated.View 
                    onTouchEnd={() => textInputActive ? Keyboard.dismiss() : null } 
                    style={{ 
                        opacity: this.animatedOpacity,
                        top: topPosition,
                        left: this.positions.left,
                        height: this.componentDimensions.height,
                        width: this.componentDimensions.width,
                        justifyContent: itemAdded ? 'center' : 'space-around',
                        ...styles.itemContainer
                    }}
                >
                    { itemAdded ? 
                        <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.successMessage }}>SUCCESS</Text> : 

                        <View style={styles.specifications}>
                            <Text style={{ fontFamily: 'Montserrat-Medium', ...styles.itemName }}>{item.name}</Text>
                            <View style={{ ...styles.specBar }}/>
                            <Text style={{ fontFamily: 'Montserrat-Medium', ...styles.itemDescription }}>{item.description}</Text>
                            <TextInput 
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.27,
                                    shadowRadius: 4.65,
                                    elevation: 6,
                                    ...styles.textInput
                                }}
                                onChangeText={text => this.onChangeText(text)}
                                multiline={true}
                                value={specialInstructions}
                                placeholder={this.initialSpecialInstructionText}
                                onFocus={() => this.toggleTextInput(true)}
                                onSubmitEditing={() => { Keyboard.dismiss(); this.toggleTextInput(false) }}
                                keyboardAppearance="dark"
                                returnKeyType="done"
                            />
                            <View style={{ ...styles.quantityContainer }}>
                                <View 
                                    style={{ 
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,
                                        elevation: 3,
                                        ...styles.plus
                                    }}
                                    onTouchEnd={() => this.changeQuantity(quantity - 1)}
                                >
                                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, marginLeft: 4, marginTop: -4 }}>-</Text>
                                </View>
                                <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25 }}>{quantity}</Text>
                                <View 
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 3 },
                                        shadowOpacity: 0.27,
                                        shadowRadius: 4.65,
                                        elevation: 3,
                                        ...styles.minus
                                    }}
                                    onTouchEnd={() => this.changeQuantity(quantity + 1)}
                                >
                                    <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 25, marginRight: 10, marginTop: -1 }}>+</Text>
                                </View>
                            </View>
                        </View>
                    }
                    <TouchableOpacity
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.40,
                            shadowRadius: 4.65,
                            elevation: 3,
                            paddingLeft: !itemAdded ? 124 : 0,
                            paddingRight: !itemAdded ? 20 : 0,
                            justifyContent: itemAdded ? 'center' : 'space-between',
                            ...styles.addToOrderButton,
                        }}
                        onPress={() => itemAdded ? this.close() : this.addToOrder({ quantity, specialInstructions, ...item })}
                    >
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 20, color: 'white' }}>
                            { itemAdded ? "Close" : "Add to Order" }
                        </Text>
                        { itemAdded ? null : 
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 20, color: 'white' }}>
                                ${totalPrice.toFixed(2)}
                            </Text>
                        }
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleItemScreen: (item) => dispatch(toggleItemScreen(item)),
        addItemToOrder: (item) => dispatch(addItemToOrder(item))
    }
}

export default connect(null, mapDispatchToProps)(ItemScreen)