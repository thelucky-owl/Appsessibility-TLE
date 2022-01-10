import React from 'react';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    standardView: {
        marginVertical: 40,
        marginHorizontal: 5,
        padding: 10,
        flex: 1,
    },
    title: {
        fontSize: 35,
        marginVertical: 10,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: 'center',
    },
    paragraph: {
        fontSize: 15,
        marginVertical: 20,
    },
    button: {
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#2143d0',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20
    },
    standardInput: {
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize: 30,
    },
    centeredTextInput: {
        textAlign: 'center',
    },
    categoryList: {
        width: '100%',
        backgroundColor: '#DDD',
    },
    error: {
        color: '#D72313',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    noAnswerGiven: {
        color: '#D72313',
    },
    onlyStandardAnswer: {
        color: '#D3940F',
    },
    fullAnswer: {
        color: '#28891a',
    },
    questionButton: {
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 1,
    },  
    questionButtonText: {
        fontSize: 30,
        marginBottom: 20,
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        shadowColor: "#000",
        marginHorizontal: 20,
        marginTop: 50,
        paddingVertical: 30,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 3,
    },
    centeredView: {
        flex: 1,
        marginTop: 22
    },
    modalButton: {
        width: '80%',
    },
    recording: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderRadius: 100,
        width: 160,
        height: 160,
    },
    recordingOn: {
        borderColor: 'red',
        backgroundColor: 'red',
    },
    recordingOff: {
        borderColor: 'black',
    },
    notifyRecording: {
        fontSize: 40,
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50
    },
    notify: {
        fontSize: 20,
        marginTop: 40,
        textAlign: 'center',
    }, 
    logOutButton: {
        marginVertical: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#8B0000',
    },
    logOutButtonText: {
        color: '#FFFFFF',
        fontSize: 20
    },
})
