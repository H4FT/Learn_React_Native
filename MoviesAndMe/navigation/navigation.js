import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Search from '../components/search'
import FilmDetail from '../components/film_detail'
import Favorites from '../components/favorites'

const SearchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: "Rechercher"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Détail'
        }
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Favorite: {
        screen: Favorites,
        navigationOptions: {
            title: "Favorites"
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: 'Détail'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../image/is_search.png')}
                        style={styles.icon}
                    />
                }
            }
        },
        Favorites: {
            screen: FavoriteStackNavigator,
            navigationOptions: {
                tabBarIcon: () => {
                    return <Image
                        source={require('../image/ic_favorite.png')}
                        style={styles.icon}
                    />
                }
            }
        }
    },
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)