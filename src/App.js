import React, { Component } from 'react'

import fetch from 'isomorphic-fetch'

class App extends Component {
    constructor() {
        super()
        this.state = {
            year: 2018
        }
        this.request = this.request.bind(this)
    }
    request () {
        const { year, zipcode } = this.state
        fetch('http://api.mynext.vote/', {
                method: 'POST',
                headers: {
                  'content-type': 'application/graphql',
                },
                body: `{
                    election(year: ${year} zipcode: ${zipcode}) {
                        year
                        name
                        reps {
                            firstName
                            lastName
                            title
                        }
                    }
                }`
            })
            .then(res => res.json())
            .then(res => this.setState({
                election: res.data.election
            }))

    }
    render() {
        const { election } = this.state
        return (
            <div>
                <input
                    type="text"
                    value={this.state.zipcode}
                    onChange={({target}) =>
                        this.setState({zipcode: target.value })
                    }
                />
                <button onClick={() => this.request()}>GO</button>
                
                { election && (
                    <div>
                        <h1>Your next vote is the {election.name}</h1>
                        <h3>Representatives up for re-election</h3>
                        <ul>
                        { election.reps && election.reps.map(({ firstName, lastName, title }) =>
                            <li key={lastName}>
                                <h2>{`${title}. ${firstName} ${lastName}`}</h2>
                            </li>
                        ) }
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

export default App
