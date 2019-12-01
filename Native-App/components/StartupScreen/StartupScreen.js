// VENDOR
import React from 'react'
import { TextInput, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import * as Font from 'expo-font'

// APP
import styles from './StartupScreen.styles.scss'
import { updateCurrentPage } from '../AppNavigator/AppNavigator.reducer'
import { setGlobalVariables } from './globalVars.reducer'

class StartupScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            API_URL: null,
            TableNum: null,
            fontsLoaded: false,
        }

        this.goToScreensaverPage = this.goToScreensaverPage.bind(this);
        this.onChangeAPI_URL = this.onChangeAPI_URL.bind(this);
        this.onChangeTableNum = this.onChangeTableNum.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            'Montserrat-Bold': require('../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
        })
        this.setState({ fontsLoaded: true })
        this.props.updateCurrentPage('StartupScreen');
    }

    goToScreensaverPage() {
        const { navigate } = this.props.navigation;
        if( this.state.API_URL === null || this.state.TableNum === null ) {
            alert("Neither values can be null");
            return;
        }

        this.props.setGlobalVariables({ API_URL: this.state.API_URL, TableNum: this.state.TableNum })
        navigate('ScreenSaver')
    }

    onChangeAPI_URL(text) {
        this.setState({ API_URL: text.toLowerCase() });
    }

    onChangeTableNum(text) {
        this.setState({ TableNum: text.toLowerCase() })
    }

    render() {
        const { API_URL, TableNum, fontsLoaded } = this.state;
        const { setGlobalVariables } = this.props;

        return !fontsLoaded ? null : (
            <SafeAreaView>
                <View style={styles.wrapper}>
                <TextInput 
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        ...styles.textInput
                    }}
                    onChangeText={text => this.onChangeAPI_URL(text)}
                    value={API_URL}
                    placeholder={'Enter API URL code'}
                    keyboardAppearance="dark"
                    returnKeyType="done"
                />
                <TextInput 
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        ...styles.textInput
                    }}
                    onChangeText={text => this.onChangeTableNum(text)}
                    value={TableNum}
                    placeholder={'Enter Table Number'}
                    keyboardAppearance="dark"
                    returnKeyType="done"
                />

                <TouchableOpacity style={styles.doneButton} onPress={() => this.goToScreensaverPage()}>
                    <Text style={{ fontSize: 23, fontFamily: 'Montserrat-Bold', color: 'white' }}>
                        Ready
                    </Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentPage: (currentPage) => dispatch(updateCurrentPage(currentPage)),
        setGlobalVariables: ({ API_URL, TableNum }) => dispatch(setGlobalVariables({ API_URL, TableNum }))
    }
}

export default connect(null, mapDispatchToProps)(StartupScreen);