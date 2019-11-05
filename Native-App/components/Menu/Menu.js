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
                    description: "This is the description",
                    photo: "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwiw_c-L_NHlAhWRtZ4KHfFbAUsQjRx6BAgBEAQ&url=https%3A%2F%2Fmixthatdrink.com%2Fblue-long-island%2F&psig=AOvVaw3ZYV0zWZqUz7h_QCJHocqv&ust=1573005444706478",
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
        return (
            <SafeAreaView style={styles.safeView}>
                <MenuNav />
                <ScrollView style={styles.menuContainer}>
                    {this.renderItems()}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage))
    }
}

export default connect(null, mapDispatchToProps)(Menu)