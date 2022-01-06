import React, {useState} from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { globalStyles } from '../Styles/GlobalStylesheet';

export const LoginScreen = ({ navigation }) => {

    const [tempCode, setTempCode] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");

    return(
        <View style={globalStyles.standardView}>
            <View>
                <Text style={globalStyles.title}>Welkom op de loginpagina!</Text>
                <Text style={globalStyles.subTitle}>Vul hieronder uw eenmalige code in.</Text>
            </View>
            <View>
                <TextInput 
                    style={[globalStyles.standardInput, globalStyles.centeredTextInput]}
                    onChangeText={setTempCode}
                    value={tempCode}
                    keyboardType='numeric'
                />
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={ () => {
                        if (!tempCode.trim()) {
                            setErrorMessage('Er lijkt geen code te zijn ingevuld.');
                        } else if (tempCode.length < 6) {
                            setErrorMessage('De code is minimaal 6 cijfers lang.');
                        } else if (tempCode.length > 6) {
                            setErrorMessage('De code is maximaal 6 cijfers lang.');
                        } else {
                            navigation.navigate('Home', {
                                tempCode: tempCode,
                            });
                        };
                    }}
                >
                    <Text style={globalStyles.buttonText}>Ga door naar de vragenlijst</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
};