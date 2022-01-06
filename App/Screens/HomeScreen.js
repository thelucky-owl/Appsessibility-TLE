import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../Styles/GlobalStylesheet';

export const HomeScreen = ({ navigation }) => {
    let locationName;
    let categories;

    locationName = "Gemeentehuis Rotterdam";
    categories = require('../Includes/QuestionsPerCategory');

    // Change header title to right location name
    useEffect(() => {
        navigation.setOptions({ 'title': locationName })
    }, [locationName])

    const catergoryButtons = categories.map((item) => {
        return(
            <View key={item.id}>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={ () => {
                        navigation.navigate('Category', {
                            categoryID: item.id,
                        })
                    }}
                >
                    <Text style={globalStyles.buttonText}>Vragen over {item.name.toLowerCase()}</Text>
                </TouchableOpacity>
            </View>
        );
    })

    return(
        <View style={globalStyles.standardView}>
                <Text style={globalStyles.title}>Welkom bij de vragenlijst over de locatie: { locationName }.</Text>
            <ScrollView>
                {catergoryButtons}
            </ScrollView>
        </View>
    );
};