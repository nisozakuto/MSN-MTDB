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
            available_on: (this.props.selected.available_on) ? this.props.selected.available_on : [],
            seasons: (this.props.selected.season) ? this.props.selected.season.map(el => el.season) : null,
            episodes: (this.props.selected.season) ? this.props.selected.season.map(el => el.episodes) : null,
        }
    }

    componentDidUpdate(prevProps) {
        console.log(this.state.imdb_id)
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
                available_on: (this.props.selected.available_on) ? this.props.selected.available_on : [],
            })
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
                                <form className="form-box" onSubmit={(evt) => (this.props.handleFormSubmit(evt, this.state))} >
                                    <input type="submit" value="Add to watchlist" className="add-watchlist-button" />
                                </form>
                            </div>
                        {/* <div className="ratings-box">
                            <h3>Ratings</h3>
                            <p>{this.state.ratings}</p>
                        </div> */}
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
                                <img src={el.icon} alt="Provider's Icon" />
                                <h3>{el.display_name}</h3>
                                <a href={el.url} target='_blank' rel="noopener noreferrer">Watch: {this.state.title} on {el.display_name} NOW!</a>
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
