import * as firebase from 'firebase';
import Category from '../models/category';
import ApiKeys from "../constants/ApiKeys";

const CATEGORIES = [];

if (firebase.apps.length === 0) {
    firebase.initializeApp(ApiKeys.firebaseConfig);
}

firebase.database().ref().child('category').on('value', result => {
    result.forEach(category => {
        CATEGORIES.push(new Category(category.toJSON().id, category.toJSON().title, category.toJSON().color))
    });
});

export {CATEGORIES};