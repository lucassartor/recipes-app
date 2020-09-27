import {
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator,
    createDrawerNavigator
} from 'react-navigation';
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import React from 'react';
import {Text} from 'react-native';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from "../screens/FiltersScreen";
import Colors from '../constants/Colors';
import AboutScreen from '../screens/AboutScreen';

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Colors.primaryColor,
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerTintColor: 'white',
        headerTitle: 'A Screen'
    }
});

const FavNavigator = createStackNavigator({
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    },
    {

        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor,
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerTintColor: 'white',
            headerTitle: 'Favorites'
        }
    }
);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: <Text style={{fontFamily: 'open-sans'}}>Meals</Text>
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.primaryColor
        }
    },
    About: {
        screen: AboutScreen,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-information-circle' size={25} color={tabInfo.tintColor}/>
            },
            tabBarColor: Colors.primaryColor
        }
    }
};

const MealsFavTabNavigator =
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
    });

const FiltersNavigator =
    createStackNavigator({
        Filters: FiltersScreen
    }, {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.primaryColor,
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans-bold',
            },
            headerTintColor: 'white',
            headerTitle: 'A Screen'
        }
    });

const MainNavigator =
    createDrawerNavigator({
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    }, {
        contentOptions: {
            activeTintColor: Colors.primaryColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    });


export default createAppContainer(MainNavigator);
