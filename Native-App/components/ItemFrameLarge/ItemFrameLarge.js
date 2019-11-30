// VENDOR
import React from 'react'
import { Text, View, Image } from 'react-native'
import * as Font from 'expo-font'
import { connect } from 'react-redux'

// APP
import styles from './ItemFrameLarge.styles.scss'
import { toggleItemScreen } from '../ItemScreen/ItemScreen.reducer'

class ItemFrameLarge extends React.Component {
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
        const { item, toggleItemScreen } = this.props
        const itemPrice = `$${item.price}`
        return !this.state.FontsLoaded ? null : (
            <View 
                onTouchEnd={() => toggleItemScreen(item)}
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,
                    ...styles.itemLargeContainer
                }}
            >
                <View style={{ fontFamily: 'Montserrat-Medium', ...styles.itemLargeContent }}>
                    <View style={styles.itemLargeTextPlusBar}>
                        <View style={styles.goldBar}/>
                        <View style={styles.itemLargeText}>
                            <View>
                                <Text style={{ fontSize: 15, textAlign: 'left' }}>{item.name}</Text>
                                <Text style={{ fontSize: 10, textAlign: 'left' }}>{item.description}</Text>
                            </View>
                            <Text style={{ fontSize: 12, textAlign: 'left' }}>{itemPrice}</Text>
                        </View>
                    </View>
                    <Image source={{uri: item.photo}} style={styles.photo}/>
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

export default connect(null, mapDispatchToProps)(ItemFrameLarge);