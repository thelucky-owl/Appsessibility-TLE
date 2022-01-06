import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../Styles/GlobalStylesheet';

export const RecordedAnswers = ({ navigation, route }) => {
    const { categoryID, questionID } = route.params;
    let categories = require('../Includes/QuestionsPerCategory');
    let pickedCategory, pickedQuestion;
    
    for (let category of categories)
    {
        if (category.id == categoryID) {
            pickedCategory = category;
        }
    }

    for (let question of pickedCategory.questions)
    {
        if (question.id == questionID) {
            pickedQuestion = question;
        }
    }

    const recordingsStored = pickedQuestion.recordedAnswer 

    const getRecordingLines = recordingsStored.map((recordingLine,i)=>{
            return(
                <View key={i}>
                    <TouchableOpacity 
                        accessibilityHint='Luister opname terug'
                        onPress={()=> recordingLine.sound.replayAsync()} 
                        style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Opname {i + 1}</Text>
                        <Text style={globalStyles.buttonText}>{recordingLine.duration}</Text>
                    </TouchableOpacity>
                </View>
            )
        })

    const checkRecordings = () => {
        if (recordingsStored.length<1) {
            return <Text style={globalStyles.notify}>Er zijn nog geen opnamens.</Text>
        }
    }

    return(
        <View style={globalStyles.standardView}>
            <Text style={globalStyles.title}>Opnames voor de vraag: {pickedQuestion.name}</Text>
            {checkRecordings()}
            <ScrollView>
                    {getRecordingLines}
                </ScrollView>
            <TouchableOpacity
                    style={globalStyles.button}
                    onPress={ () => {
                        navigation.navigate('Category', {
                            categoryID: pickedCategory.id
                        })
                    }}
                >
                    <Text style={globalStyles.buttonText}>Ga terug naar de vragenlijst</Text>
                </TouchableOpacity>
        </View>
    );

};