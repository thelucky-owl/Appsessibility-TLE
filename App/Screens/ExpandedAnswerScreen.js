import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "../Styles/GlobalStylesheet";
import { db } from "../../firebase";
import { collection, getDocs , doc, setDoc, addDoc } from "firebase/firestore";

export const ExpandedAnswerScreen = ({ navigation, route }) => {
    const { categoryID, questionID } = route.params;
    let categories = require('../Includes/QuestionsPerCategory');
    let pickedCategory, pickedQuestion;
    const [answer, setAnswer] = useState("");

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

    const changeStatus = (newStatus) => {
        pickedQuestion.status = newStatus;
    }
    
    const setFullAnswer = (answer) => {
        pickedQuestion.answer = answer;
    }

    const handleNew = async (answer) => {
        const setFullAnswer = (answer) => {
            pickedQuestion.answer = answer;
        }   
        const question = `${pickedQuestion.name}`
        const value = (question)
        const collectionRef = collection(db,"vragen");
        const payload = {answer, value};
        await addDoc(collectionRef, payload);
    }

    // Change header title to right category name
    useEffect(() => {
        navigation.setOptions({ 'title': `${pickedQuestion.name}` })
        setAnswer(pickedQuestion.answer)
    }, [pickedCategory])

    return(
        <View style={globalStyles.standardView}>
            <Text style={globalStyles.title}>{pickedQuestion.name}</Text>
            <TextInput 
                    style={[globalStyles.standardInput, globalStyles.centeredTextInput]}
                    onChangeText={setAnswer}
                    value={answer}
                    keyboardType='default'
            />
            <TouchableOpacity
                    style={globalStyles.button}
                    onPress={ () => {
                        handleNew(answer, pickedQuestion.name)
                        changeStatus(2);
                        setFullAnswer(answer);
                        navigation.navigate('Category', {
                            categoryID: pickedCategory.id
                        })
                    }}
                >
                    <Text style={globalStyles.buttonText}>Sla antwoord op</Text>
                </TouchableOpacity> 
        </View>
    );

};