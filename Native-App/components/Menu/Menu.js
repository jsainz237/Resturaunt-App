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

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.dummyData = {
            items: [
                { 
                    name: "The Item Name",
                    category: "Entrees",
                    description: "This is the description",
                    price: 2.99,
                },
                { 
                    name: "Item-2",
                    category: "Drinks",
                    description: "This is the description of the item",
                    photo: "http://www.pngnames.com/files/4/Cocktail-PNG-Photo-Background.png",
                    price: 7.99,
                },
                { 
                    name: "Item-3",
                    category: "Entrees",
                    description: "This is the description",
                    price: 2.99,
                },
            ]
        }

        this.categories = new Set(this.dummyData.items.map(item => item.category));

        this.renderItems = this.renderItems.bind(this);
    }

    componentDidMount() {
        this.props.updateCurrentPage('Menu');
    }

    renderItems() {
        const categories = Array.from(this.categories);
        const categoryComponents = categories.map((category, index) => {
            const items = this.dummyData.items.filter(item => item.category === category);
            return <Category category={category} items={items} key={index}/>
        })

        return categoryComponents;
    }
    
    render() {
        const { itemToShow } = this.props;
        return (
            <SafeAreaView style={styles.safeView}>
                { itemToShow && <ItemScreen item={itemToShow} /> }
                <MenuNav />
                <ScrollView style={styles.menuContainer}>
                    {this.renderItems()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        itemToShow: state.ItemScreen.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)