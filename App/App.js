import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// Screens
import { LoginScreen } from './Screens/LoginScreen';
import { HomeScreen } from './Screens/HomeScreen';
import { CategoryScreen } from './Screens/CategoryScreen';
import { VoiceRecorder }  from './Screens/VoiceRecorder';
import { StandardAnswerScreen} from './Screens/StandardAnswerScreen';
import { RecordedAnswers }  from './Screens/RecordedAnswers';
import { ExpandedAnswerScreen } from './Screens/ExpandedAnswerScreen'

const Stack = createNativeStackNavigator();

// App shows the end product for user
export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications
  
  return(
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
      >

        { /* Loginscreen for the temporary code */ }
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={ {
            title: "Login",
            headerShown: false,
          } }
        />

        { /* Homescreen, in which it shows all the categories of a certain questionnaire */ }
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
        />

        {/* each induvidual category and the questions that belong to that category */}
        <Stack.Screen 
          name="Category" 
          component={CategoryScreen} 
        />

        { /* Screen for recording voicerecordings */ }
        <Stack.Screen 
          name="Recorder" 
          component={VoiceRecorder} 
          options={ {
            title: "Antwoord opnemen",
          } }
        />

        { /* Screen to see all the recordings */ }
        <Stack.Screen 
          name="RecordedAnswers" 
          component={RecordedAnswers} 
          options={ {
            title: "Opgenomen antwoorden",
          } }
        />

        { /* Screen to fill in standard answer */ }
        <Stack.Screen 
          name="StandardAnswer" 
          component={StandardAnswerScreen} 
        />  

        { /* Screen to expand answer with typing */ }
        <Stack.Screen 
          name="ExpandedAnswer" 
          component={ExpandedAnswerScreen} 
        /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
};
