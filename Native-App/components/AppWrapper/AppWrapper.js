// VENDOR
import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'

// APP
import AppNavigator from '../AppNavigator/AppNavigator'
import Checkout from '../Checkout/Checkout'

/**
 * wrap the app so that it has access to redux state
 */
const AppWrapper = (props) => {
    const { currentPage } = props;
    return (
        <View style={{ height: '100%', width: '100%' }}>
            {/* { currentPage === "Menu"  ? <Checkout /> : null} */}
            <AppNavigator />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.AppNav.currentPage
    }
}

export default connect(mapStateToProps, null)(AppWrapper);

