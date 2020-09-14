import React from 'react'
import FilmItem from './film_item'
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native'
import { getFilmwithAPI } from '../API/TDMBapi'
import FilmList from './film_list'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText = ''
        this.page = 0
        this.totalpages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this._loadFilms = this._loadFilms.bind(this)
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmwithAPI(this.searchedText, (this.page+1)).then(data => {
                this.page = data.page
                this.totalpages = data.total_pages
                this.setState({
                    films: this.state.films.concat(data.results),
                    isLoading: false
                })
            })
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalpages = 0
        this.setState({
            films: [],
        }, () => {
            this._loadFilms()
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du Film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Rechercher' onPress={() => this._searchFilms()}/>
                <FilmList
                    films = {this.state.films}
                    navigation = {this.props.navigation}
                    loadFilms = {this._loadFilms}
                    page = {this.page}
                    totalpages = {this.totalpages}
                    favoriteList = {false}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search