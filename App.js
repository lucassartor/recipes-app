import React, {useState} from 'react';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import {enableScreens} from 'react-native-screens';
import ApiKeys from "./constants/ApiKeys";
import * as firebase from 'firebase';

import MealsNavigator from './navigation/MealsNavigator';


enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};


export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (firebase.apps.length === 0) {
        firebase.initializeApp(ApiKeys.firebaseConfig);
    }

    if (!fontLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFontLoaded(true)}
            />
        );
    }

    return <MealsNavigator />;
}
