// VENDOR
import React from 'react'
import { View, Text } from 'react-native'
import * as Font from 'expo-font'

// APP
import styles from './Category.styles.scss'
import ItemFrameSmall from '../ItemFrameSmall/ItemFrameSmall';
import ItemFrameLarge from '../ItemFrameLarge/ItemFrameLarge';


class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            FontsLoaded: false
        }

        this.renderItemFrames = this.renderItemFrames.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        })
        this.setState({ FontsLoaded: true });
    }

    renderItemFrames() {
        const { items } = this.props;
        const itemFrames = items.map((item, index) => {
            return item.photo ? 
                <ItemFrameLarge item={item} key={index} /> : 
                <ItemFrameSmall item={item} key={index} />
        })
        return itemFrames;
    }

    render() {
        const { category, items } = this.props;
        return !this.state.FontsLoaded ? null : (
            <View>
                <Text style={{ fontFamily: 'Montserrat-Bold', ...styles.categoryText}}>
                    {category}
                </Text>
                <View style={styles.itemsWrapper}>
                    {this.renderItemFrames()}
                </View>
            </View>
        )
    }
}

export default Category