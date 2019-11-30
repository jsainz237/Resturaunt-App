// VENDOR
import React from 'react'
import { View, Text } from 'react-native'

// APP
import MenuNavItem from '../MenuNavItem/MenuNavItem'
import styles from './MenuNav.styles.scss'

class MenuNav extends React.Component {
    
    render() {
        return (
            <View style={styles.navBar}>
                <MenuNavItem categoryName='Entrees' first/>
                <MenuNavItem categoryName='Sides' />
                <MenuNavItem categoryName='Drinks' />
                <MenuNavItem categoryName='Desserts' />
            </View>
        )
    }
}

export default MenuNav