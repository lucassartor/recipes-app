import { createStackNavigator, createAppContainer, ThemeColors } from 'react-navigation';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';

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
    headerTintColor: 'white',
  }
});

export default createAppContainer(MealsNavigator);
