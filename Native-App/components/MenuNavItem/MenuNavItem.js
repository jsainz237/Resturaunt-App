// VENDOR
import React from 'react'
import { View, Text } from 'react-native'
import * as Font from 'expo-font'
import { connect } from 'react-redux'

// APP
import styles from './MenuNavItem.styles.scss'
import { setCategory } from '../Menu/Menu.reducer'

class MenuNavItem extends React.Component {
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
        const { categoryName, first, currentCategory, setCategory } = this.props;
        return !this.state.FontsLoaded ? null : (
            <View style={{ marginLeft: first ? 32 : 40 }} onTouchEnd={() => setCategory(categoryName)}>
                <Text style={{ fontFamily: 'Montserrat-Medium', ...styles.categoryName }}>{categoryName}</Text>
                { currentCategory.toLowerCase() === categoryName.toLowerCase() ? <View style={styles.selectedBar}/> : null }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentCategory: state.Menu.category
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (category) => dispatch(setCategory(category))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuNavItem)