import React, { Component } from 'react'
export default class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            imdb_id: this.props.selected.imdb_id,
            title: this.props.selected.title,
            year: this.props.selected.year,
            titleType: this.props.selected.titleType,
            image: this.props.selected.image,
            runTime: this.props.selected.runTime,
            certificate: this.props.selected.certificate,
            ratings: this.props.selected.ratings,
            genres: this.props.selected.genres,
            releaseDate: this.props.selected.releaseDate,
            summary: this.props.selected.summary,
            outline: this.props.selected.outline,
            parentTitle_id: this.props.selected.parentTitle_id,
            has_watched: false,
            watched_time: null,
            user_rating: 20,
            available_on: (this.props.selected.available_on) ? this.props.selected.available_on : [],
            seasons: (this.props.selected.season) ? this.props.selected.season.map(el => el.season) : null,
            episodes: (this.props.selected.season) ? this.props.selected.season.map(el => el.episodes) : null,
            user_episodes: (this.props.selected.userEpisodes) ? this.props.selected.userEpisodes : null,
            user_shows: (this.props.selected.userShows) ? this.props.selected.userShows : null,
            user_movies: (this.props.selected.userMovies) ? this.props.selected.userMovies : null,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selected !== this.props.selected) {
            this.setState({
                imdb_id: this.props.selected.imdb_id,
                title: this.props.selected.title,
                year: this.props.selected.year,
                titleType: this.props.selected.titleType,
                image: this.props.selected.image,
                runTime: this.props.selected.runTime,
                certificate: this.props.selected.certificate,
                ratings: this.props.selected.ratings,
                genres: this.props.selected.genres,
                releaseDate: this.props.selected.releaseDate,
                summary: this.props.selected.summary,
                outline: this.props.selected.outline,
                parentTitle_id: this.props.selected.parentTitle_id,
                user_episodes: (this.props.selected.userEpisodes) ? this.props.selected.userEpisodes : null,
                user_shows: (this.props.selected.userShows) ? this.props.selected.userShows : null,
                user_movies: (this.props.selected.userMovies) ? this.props.selected.userMovies : null,
                available_on: (this.props.selected.available_on) ? this.props.selected.available_on : [],
            })
            this.toggleWatch()
        }
        // console.log('prevProps', prevProps)
        // console.log('THIS', this.props)
    }

    componentDidMount() {
        if (this.props.selected) {
            this.setState({
                dataLoaded: true,
            })
        }
    }

    seasonsAndEpisodes() {
        return this.state.seasons.map((el, i) => {
            return (
                <li key={i}>
                    {el}
                    <ul>
                        {this.state.episodes.map(elem => {
                            return elem.map(ele => {
                                if (ele.season === el) {
                                    let url = ele.id.split('/')[2]
                                    // console.log(ele)
                                    // console.log(url)
                                    return (
                                        <li key={ele.id} onClick={() => { this.props.selectedPoster(url)}} >{`Ep: ${ele.episode} Title: ${ele.title}`}</li>
                                    )
                                }
                            })
                        })}
                    </ul>
                </li>
            )
        })
    }

    handleChange(e) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        this.setState({
            [name]: value,
        })
    }

    toggleWatch() {
        if (this.props.user) {
            if (this.state.titleType === 'movie') {
                if (this.state.user_movies) {
                    let movieCheck = this.state.user_movies.filter(movie => (movie.imdb_id === this.state.imdb_id))
                    if (movieCheck.length > 0) {
                        return (
                            <form onSubmit={(evt) => (this.props.handleUsersInputSubmit(evt, this.state.has_watched, this.state.user_rating, this.state.titleType, this.state.imdb_id))}>
                                <input type='range' name='user_rating' min='0' max='10' value={movieCheck.ratings} onChange={this.handleChange} />
                                {(movieCheck.has_watched) ? <p>{movieCheck.watched_time}</p> : <input type='radio' name='has_watched' onChange={this.handleChange} />}
                                <input type='submit' value='Save Input' />
                            </form>
                        )
                    } else {
                        return (
                            <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                                <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                            </form>
                        )
                    }
                } else {
                    return (
                        <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                            <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                        </form>
                    )
                }
            } else if (this.state.titleType === 'tvSeries') {
                if (this.state.user_shows) {
                    let showCheck = this.state.user_shows.filter(show => (show.imdb_id === this.state.imdb_id))
                    if (showCheck.length > 0) {
                        return (
                            <form onSubmit={(evt) => (this.props.handleUsersInputSubmit(evt, this.state.has_watched, this.state.user_rating, this.state.titleType, this.state.imdb_id))}>
                                <input type='range' name='user_rating' min='0' max='10' value={this.state.user_rating} onChange={this.handleChange} />
                                {(showCheck.has_watched) ? <p>{showCheck.watched_time}</p> : <input type='checkbox' name='has_watched' onChange={this.handleChange} />}
                            </form>
                        )
                    } else {
                        return (
                            <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                                <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                            </form>
                        )
                    }
                } else {
                    return (
                        <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                            <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                        </form>
                    )
                }
            } else if (this.state.titleType === 'tvEpisode') {
                if (this.state.user_episodes) {
                    let episodeCheck = this.state.user_episodes.filter(episode => (episode.imdb_id === this.state.imdb_id))
                        if (episodeCheck.length > 0) {
                            return (
                                <form onSubmit={(evt) => (this.props.handleUsersInputSubmit(evt, this.state.has_watched, this.state.user_rating, this.state.titleType, this.state.imdb_id))}>
                                    <input type='range' name='user_rating' min='0' max='10' value={this.state.user_rating} onChange={this.handleChange} />
                                    {(episodeCheck.has_watched) ? <p>{episodeCheck.watched_time}</p> : <input type='checkbox' name='has_watched' onChange={this.handleChange} />}
                                </form>
                            )
                        } else {
                            return (
                                <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                                    <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                                </form>
                            )
                        }
                } else {
                    return (
                        <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                            <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                        </form>
                    )
                }
            }
        } else {
            return (
                <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                    <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                </form>
            )
        }
    }

    conditionalRender() {
        return (
            <div>
            <section className="show-page">
                <aside className="image-box">
                    <img alt='Movie/Show Poster' src={(this.props.selected) ? this.state.image : "https://images.pexels.com/photos/3150553/pexels-photo-3150553.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}/>
                </aside>
                <div className="info-box">
                    <article className="detail-info">
                            <h1>
                                {this.state.title}({this.state.year})
                            </h1>
                            <div className='summary'>
                                <h2>
                                    Summary
                                </h2>
                                {(this.state.summary && this.state.outline) 
                                ? 
                                <div>
                                    {this.state.summary.text}
                                    <cite>{this.state.summary.author}</cite>
                                </div> 
                                : (!this.state.summary && this.state.outline)
                                ? 
                                <div>
                                    {(this.state.outline)}
                                </div>
                                : 'Unavailable'}
                            </div>
                            <div className="info">
                                <h4><em>Run Time:</em>{this.state.runTime}</h4>
                                <h4><em>Rating:</em>{(this.state.certificate) ? this.state.certificate.US.map(el => el.certificate) : 'Unavailable'}</h4>
                                <h4>{/* ratingReasons are possible */}</h4>
                                <h4><em>Release Date:</em>{this.state.releaseDate}</h4>
                                <h4><em>Genres:</em>{this.state.genres.map((el, i) => <span key={i}> •{el} </span>)}</h4>
                                {/* <div className="ratings-box">
                                    <h3>Ratings</h3>
                                    <p>{this.state.ratings}</p>
                                </div> */}
                                {(this.props.selected) ? this.toggleWatch() : <p>Loading...</p>}
                            </div>
                    </article>
                    <article className="seasons-episodes-box">
                        <ul>
                            {(this.props.selected.season) ? this.seasonsAndEpisodes() : null}
                        </ul>
                    </article>
                </div>
            </section>
            <article className="where-to-watch">
                    {(this.state.available_on.length > 0) ? this.state.available_on.map(el => {
                        return (
                            <div key={el.id}>
                                <div className="logo-box">
                                    <img src={el.icon} alt="Provider's Icon" />
                                </div>
                                <h3>{el.display_name}</h3>
                                <a href={el.url} target='_blank' rel="noopener noreferrer">Watch on {el.display_name} NOW!</a>
                            </div>
                        )
                    }) : null}
            </article>
            </div>
        )
    }
    render() {
        return (
            <div className="decide">
                {(this.state.dataLoaded) ? this.conditionalRender() : <p>Loading your Results...</p>}
            </div>
        )
    }
}
