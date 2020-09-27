import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

const FiltersSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch trackColor={{false: 'grey', true: 'rgba(74,20,140,0.75)'}} thumbColor={'rgba(74,20,140,1)'}
                    value={props.value} onValueChange={props.onChange}/>
        </View>
    );
}
const FiltersScreen = props => {

    const {navigation} = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegetarian: isVegetarian,
            vegan: isVegan,
        }
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan]);

    useEffect(() => {
        navigation.setParams({save: saveFilters})
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filtes / Restrictions</Text>
            <FiltersSwitch label="Gluten-Free" value={isGlutenFree} onChange={newValue => setIsGlutenFree(newValue)}/>
            <FiltersSwitch label="Lactose-Free" value={isLactoseFree}
                           onChange={newValue => setIsLactoseFree(newValue)}/>
            <FiltersSwitch label="Vegetarian" value={isVegetarian} onChange={newValue => setIsVegetarian(newValue)}/>
            <FiltersSwitch label="Vegan" value={isVegan} onChange={newValue => setIsVegan(newValue)}/>
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Filters',
        headerLeft:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu' iconName='ios-menu' onPress={() => navData.navigation.toggleDrawer()}/>
            </HeaderButtons>,
        headerRight:
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Save' iconName='ios-save' onPress={navData.navigation.getParam('save')}/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15,
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen;
