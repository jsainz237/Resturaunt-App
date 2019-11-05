// VENDOR
import React from 'react'
import { Text, View } from 'react-native'
import * as Font from 'expo-font'

// APP
import styles from './ItemFrameSmall.styles.scss'

class ItemFrameSmall extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FontsLoaded: false,
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Medium': require('../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        })
        this.setState({ FontsLoaded: true });
    }

    render() {
        const { item } = this.props
        const itemPrice = `$${item.price}`
        return !this.state.FontsLoaded ? null : (
            <View 
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                    ...styles.itemContainer
                }}
            >
                <View style={{ fontFamily: 'Montserrat-Medium', ...styles.itemText }}>
                    <Text style={{ fontSize: 15, textAlign: 'center' }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>{itemPrice}</Text>
                </View>
            </View>
        )
    }
}

export default ItemFrameSmall;