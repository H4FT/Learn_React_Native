import React from 'react'
import FadeIn from '../animations/fadein'
import { getImagefromApi } from '../API/TDMBapi'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
            return (
                <Image
                    style={style.favorite_image}
                    source={require('../image/ic_favorite.png')}
                />
            )
        }
    }

    render() {
        const film = this.props.film
        const displayDetailForFilm = this.props.displayDetailForFilm
        return (
            <FadeIn>
                <TouchableOpacity
                    style={style.main_container}
                    onPress={() => displayDetailForFilm(film.id)}
                >
                    <Image
                        style={style.image}
                        source={{uri: getImagefromApi(film.poster_path)}}
                    />
                    <View style={style.content_container}>
                        <View style={style.header_container}>
                            {this._displayFavoriteImage()}
                            <Text style={style.title_text}>{film.title}</Text>
                            <Text style={style.vote_text}>{film.vote_average}</Text>
                        </View>
                        <View style={style.description_container}>
                            <Text style={style.description_text} numberOfLines={6}>{film.overview}</Text>
                        </View>
                        <View style={style.date_container}>
                            <Text style={style.date_text}>Sorti le {film.release_date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </FadeIn>
        )
    }
}

const style = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row'
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5
    }
})

export default FilmItem