import React from 'react';

import {CATEGORIES} from '../data/dummy-data';
import {useSelector} from "react-redux";
import MealList from '../components/MealList';
import {View, Text} from "react-native";

const CategoryMealScreen = props => {

    const catId = props.navigation.getParam('categoryId');

    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if(displayedMeals.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'open-sans'}}>No meals found, maybe check your filters?</Text>
            </View>
        );
    }

    return <MealList listData={displayedMeals} navigation={props.navigation}/>;
};

CategoryMealScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');

    const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

    return {
        headerTitle: selectedCategory.title
    };
};

export default CategoryMealScreen;
