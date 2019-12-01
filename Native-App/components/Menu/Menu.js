// VENDOR
import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { connect } from 'react-redux'

// APP
import styles from './Menu.styles.scss'
import MenuNav from '../MenuNav/MenuNav'
import { updateCurrentPage } from '../AppNavigator/AppNavigator.reducer'
import ItemFrameSmall from '../ItemFrameSmall/ItemFrameSmall'
import Category from '../Category/Category'
import ItemScreen from '../ItemScreen/ItemScreen'
import Checkout from '../Checkout/Checkout'

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            foodItems: null,
            categories: null,
        }

        this.goToSuccessScreen = this.goToSuccessScreen.bind(this);
        this.renderItems = this.renderItems.bind(this);
        this.getFoodItems = this.getFoodItems.bind(this);
    }

    componentDidMount() {
        this.props.updateCurrentPage('Menu');
        this.getFoodItems();
    }

    goToSuccessScreen() {
        const { navigate } = this.props.navigation;
        navigate('SuccessScreen');
    }

    getFoodItems() {
        return fetch(`${this.props.API_URL}/food`)
            .then((res) => res.json())
            .then((resJson) => {
                this.setState({
                    foodItems: resJson,
                    categories: new Set(resJson.map(item => item.category))
                });
            })
            .catch((error) => console.error(error))
    }

    renderItems() {
        const categories = Array.from(this.state.categories);
        const categoryComponents = categories.map((category, index) => {
            const items = this.state.foodItems.filter(item => item.category === category);
            return <Category category={category} items={items} key={index}/>
        })

        return categoryComponents;
    }
    
    render() {
        const { itemToShow } = this.props;
        return this.state.foodItems === null ? null : (
            <SafeAreaView style={styles.safeView}>
                { itemToShow && <ItemScreen item={itemToShow} /> }
                <Checkout goToSuccessScreen={this.goToSuccessScreen} />
                {/* <MenuNav /> */}
                <ScrollView style={styles.menuContainer}>
                    {this.renderItems()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemToShow: state.ItemScreen.item,
        API_URL: state.Global.API_URL,
        TableNum: state.Global.TableNum,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)