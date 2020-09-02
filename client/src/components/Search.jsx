import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div className="search-page">
                <div className="search-box">
                    <form onSubmit={(e) => this.props.handleSearchSubmit(e)}>
                        <input type="text" name="title" placeholder="Search by Title" onChange={this.props.handleInputChange} />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <div className="search-results">
                    <ul>
                        {(this.props.list.length) ? <li>Loading Movies &amp; Shows</li> : this.props.list.map(el => <li key={el.id}>{el.title}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
}