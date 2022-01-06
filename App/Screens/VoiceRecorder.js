import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { globalStyles } from '../Styles/GlobalStylesheet';
import { Audio } from 'expo-av'
import { Ionicons } from '@expo/vector-icons';
import { Recording } from 'expo-av/build/Audio';

export const VoiceRecorder = ({ navigation, route }) => {
    // Get categoryID and questionID, to see which category 
    // we are in and which question the user clicked
    const { categoryID, questionID } = route.params;

    const [recording, setRecording] = useState();
    const [recordingsStored, setRecordingsStored] = useState([])

    // Import categories, create variables to store data of category 
    // and question in
    let categories = require('../Includes/QuestionsPerCategory');
    let pickedCategory, pickedQuestion;

    for (let category of categories) {
        if (category.id == categoryID) {
            pickedCategory = category;
        }
    }

    for (let question of pickedCategory.questions) {
        if (question.id == questionID) {
            pickedQuestion = question;
        }
    }

    async function startRecording() {
        try {        
            // Request permission to use mic
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            // Create a new recording, set quality, start and place in state
            const recording = new Audio.Recording();
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            setRecording(recording);
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();

        // Get recording file location
        const uri = recording.getURI();

        let updatedRecordings = [...recordingsStored];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
            sound: sound,
            duration: getDuration(status.durationMillis),
            file: uri
        });
        setRecordingsStored(updatedRecordings);
    }

    const getRecordingLines = recordingsStored.map((recordingLine, i) => {
            return (
                <View key={i}>
                    <TouchableOpacity 
                        accessibilityLabel='Opname terug af spelen'
                        onPress={() => recordingLine.sound.replayAsync()} style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Opname {i + 1}</Text>
                        <Text style={globalStyles.buttonText}>{recordingLine.duration}</Text>
                    </TouchableOpacity>
                </View>
            )
        })

    const getDuration = (millis) => {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `Duur: ${minutesDisplay}:${secondsDisplay}`
    }

    const setRecordedAnswer = (recordingsStored) => {
        recordingsStored.forEach(element => {
            pickedQuestion.recordedAnswer.push(element)
        });
    }

    return (
        <View style={globalStyles.standardView}>
            <Text style={globalStyles.title}>{pickedQuestion.name}</Text>
            <View style={globalStyles.center}>
                {recording && <Text style={globalStyles.notifyRecording}>Opname loopt..</Text>}
                <TouchableOpacity
                    accessibilityLabel={recording ? "Opname stoppen" : "Opname starten"}
                    style={[globalStyles.recording, recording ? globalStyles.recordingOn : globalStyles.recordingOff]}
                    onPress={recording ? stopRecording : startRecording}>
                    <Ionicons name="mic" size={90} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView style={globalStyles.scrollRecordings}>
                {getRecordingLines}
            </ScrollView>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={ () => {
                    setRecordedAnswer(recordingsStored)
                    navigation.navigate('Category', {
                        categoryID: pickedCategory.id
                    })
                }}>
                    <Text style={globalStyles.buttonText}>Sla opnames op</Text>
            </TouchableOpacity>
        </View>
    )
}