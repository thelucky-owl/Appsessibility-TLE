import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { globalStyles } from '../Styles/GlobalStylesheet';

export const CategoryScreen = ({ navigation, route }) => {
    const { categoryID } = route.params;
    let categories = require('../Includes/QuestionsPerCategory');
    let pickedCategory,pickedCategoryQuestions;

    const [modalVisibility, setModalVisibility] = useState(false)
    const [modalVisibility2, setModalVisibility2] = useState(false)
    const [pressedId, setPressedId] = useState()
    const[unAnswered, setUnAnswered]=useState([])

    for (let category of categories)
    {
        if (category.id == categoryID) {
            pickedCategory = category;
            pickedCategoryQuestions = category.questions;
        }
    }

    let statusName = (status) => {
        switch (status) {
            case 0:
                return(
                    <Text style={[globalStyles.noAnswerGiven, globalStyles.statusText]}>Geen antwoord</Text>
                );
                break;
            case 1:
                return(
                    <Text style={[globalStyles.statusText, globalStyles.onlyStandardAnswer]}>Standaardantwoord ingevuld</Text>
                );
                break;
            case 2:
                return(
                    <Text style={[globalStyles.fullAnswer, globalStyles.statusText]}>Vraag volledig ingevuld</Text>
                );
                break;
            default:
                break;
        }
    }

    const questionButtons = pickedCategoryQuestions.map((item) => {
        return(
            <View key={item.id}>
                <TouchableOpacity 
                    style={globalStyles.questionButton}
                    onPress={() => {
                        if (item.status == 0) {
                            navigation.navigate('StandardAnswer', { 
                                categoryID: pickedCategory.id,
                                questionID: item.id
                            });
                        } else {
                            setPressedId(item.id)
                            setModalVisibility(true)
                        }
                    }}
                >
                    <Text style={globalStyles.questionButtonText}>{item.name}</Text>
                    {statusName(item.status)}
                    {item.status == 1 && <Text>{item.standardAnswer}</Text>}
                    {item.status == 2 && <Text>{item.answer}</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={()=>
                        navigation.navigate('RecordedAnswers', { 
                            categoryID: pickedCategory.id,
                            questionID: item.id
                        })
                    }
                >
                    <Text style={globalStyles.buttonText}>Zie alle opnames bij vraag {item.id}</Text>
                </TouchableOpacity>
            </View>
        );
    })

    // Change header title to right category name
    useEffect(() => {
        navigation.setOptions({ 'title': `Categorie ${pickedCategory.id}: ${pickedCategory.name}` })
    }, [pickedCategory])

    return(
        <View style={globalStyles.standardView}>
            <Text style={globalStyles.title}>Vragen over {pickedCategory.name.toLowerCase()}</Text>
            <ScrollView>
                {questionButtons}
            </ScrollView>
            <Modal visible={modalVisibility} animationType="slide">
                <View style={globalStyles.centeredView}>
                    <View style={globalStyles.modal}>
                        <Text style={globalStyles.title}>Hoe wil je iets toevoegen aan je antwoord?</Text>
                        <TouchableOpacity
                            style={[globalStyles.modalButton, globalStyles.button]}
                            onPress={() => {
                                navigation.navigate('ExpandedAnswer', { 
                                    categoryID: pickedCategory.id,
                                    questionID: pressedId,
                                });   
                                setModalVisibility(false)
                            }}>
                            <Text style={globalStyles.buttonText}>Toevoeging typen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[globalStyles.modalButton, globalStyles.button]}
                            onPress={() => {
                                navigation.navigate('Recorder', { 
                                    categoryID: pickedCategory.id,
                                    questionID: pressedId,
                                });   
                                setModalVisibility(false)
                            }}>
                            <Text style={globalStyles.buttonText}>Toevoeging inspreken</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[globalStyles.modalButton, globalStyles.button]}
                            onPress={()=>{
                                setModalVisibility(false)
                            }}>
                            <Text style={globalStyles.buttonText}>Niet nu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity 
                style={globalStyles.button}
                onPress={()=>{
                    let updateUnanswered = []
                    let questionStatus
                    for (questionStatus of pickedCategoryQuestions) {
                        if(questionStatus.status === 0){
                        updateUnanswered.push(questionStatus.id)
                        setUnAnswered(updateUnanswered)
                        }
                    }
                    if(updateUnanswered.length>0){
                        setModalVisibility2(true)
                    }else{
                        navigation.navigate('Home', { 
                        });
                    }
                }}>
                <Text style={globalStyles.buttonText}>Klaar</Text>
            </TouchableOpacity>
            <Modal visible={modalVisibility2} animationType='slide'>
                <View style={globalStyles.centeredView}>
                    <View style={globalStyles.modal}>
                        <Text style={globalStyles.title}>Weet je zeker dat je verder wil gaan? Er zijn nog {unAnswered.length} vragen niet ingevuld.</Text>
                        <TouchableOpacity
                            style={[globalStyles.modalButton, globalStyles.button]}
                            onPress={()=>{
                                setModalVisibility2(false)
                            }}>
                            <Text style={globalStyles.buttonText}>Terug naar de vragen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[globalStyles.modalButton, globalStyles.button]}
                            onPress={()=>{
                                setModalVisibility2(false)
                                navigation.navigate('Home', { 
                            });}}>
                            <Text style={globalStyles.buttonText}>Terug naar alle categorieën</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View> 
    );
};
