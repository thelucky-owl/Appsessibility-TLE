import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../Styles/GlobalStylesheet";
import { db } from "../../firebase";
import { collection, getDocs , doc, setDoc, addDoc } from "firebase/firestore";

export const StandardAnswerScreen = ({ navigation, route }) => {
    const { categoryID, questionID } = route.params;
    let categories = require('../Includes/QuestionsPerCategory');
    let pickedCategory, pickedQuestion;

    let standardAnswers = require('../Includes/StandardAnswers');

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
    
    const setStandardAnswer = (answer) => {
        pickedQuestion.standardAnswer = answer;
    }

    const handleNew = async (answer) => {
        const setStandardAnswer = (answer) => {
            pickedQuestion.standardAnswer = answer;
        }
        const question = `${pickedQuestion.name}`
        const value = (question)
        const collectionRef = collection(db,"vragenkort");
        const payload = {answer, value};
        await addDoc(collectionRef, payload);
    }

    // Change header title to right category name
    useEffect(() => {
        navigation.setOptions({ 'title': `${pickedQuestion.name}` })
    }, [pickedCategory])

    const standardAnswersButtons = standardAnswers.map((item) => {
        return(
            <View key={item}>
                <TouchableOpacity
                    style={globalStyles.questionButton}
                    onPress={ () => {
                        handleNew(item, pickedQuestion)
                        changeStatus(1);
                        setStandardAnswer(item)
                        navigation.navigate('Category', {
                            categoryID: pickedCategory.id
                        })
                    }}
                >
                    <Text style={globalStyles.title}>{item}</Text>
                </TouchableOpacity>
            </View>
        );
    })

    return(
        <View style={globalStyles.standardView}>
            <Text style={globalStyles.title}>{pickedQuestion.name}</Text>
            <ScrollView style={globalStyles.ScrollView}>
                {standardAnswersButtons}
            </ScrollView>    
        </View>
    );

};