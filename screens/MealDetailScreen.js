import React, {useCallback, useEffect} from 'react';
import {
    ScrollView,
    View,
    Image,
    Text,
    StyleSheet
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {useDispatch, useSelector} from "react-redux";

import CustomHeaderButton from '../components/CustomHeaderButton';
import {toggleFavorite} from "../store/actions/meals";

const ListItem = props => {
    return (
        <View style={styles.listItem}>
            <Text style={{fontFamily: 'open-sans'}}>{props.children}</Text>
        </View>
    );
};

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => mealId === meal.id));


    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const handleToggleFavorite = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({toggleFav: handleToggleFavorite})
    }, [selectedMeal]);

    useEffect(() => {
        props.navigation.setParams({isFav: currentMealIsFavorite})
    }, [currentMealIsFavorite]);

    return (
        <ScrollView>
            <Image source={{uri: selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={{fontFamily: 'open-sans'}}>{selectedMeal.duration}m</Text>
                <Text style={{fontFamily: 'open-sans'}}>{selectedMeal.complexity.toUpperCase()}</Text>
                <Text style={{fontFamily: 'open-sans'}}>{selectedMeal.affordability.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map(ingredient => (
                <ListItem key={ingredient}>{ingredient}</ListItem>
            ))}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map(step => (
                <ListItem key={step}>{step}</ListItem>
            ))}
        </ScrollView>
    );
};

MealDetailScreen.navigationOptions = navigationData => {
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav');

    return {
        headerTitle: mealTitle,
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title="Favorite"
                    iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
                    onPress={toggleFavorite}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});

export default MealDetailScreen;
