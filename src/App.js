import cxs from 'cxs'
import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'

import ZipCodeInput from './ZipcodeInput'
import Representative from './Representative'
class App extends Component { state = {
        year: 2018
    }

    request = () => {
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
        const { election, zipcode } = this.state
        return (
            <div className={cxs({ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flex: 1 })}>
                <div className={cxs({ flex: '0 50%', textAlign: 'center' })}>
                    <h1>My Nevt Vote</h1>
                    <p>See when you vote next and who you'll be voting for or against</p>
                </div>
                <div className={cxs({ flex: '0 50%', padding: '2em' })}>
                    <div className={cxs({ display: 'flex', alignItems: 'center' })}>
                        <div className={cxs({ flex: 1 })}>
                            <ZipCodeInput
                                zipcode={zipcode}
                                onChange={zipcode => this.setState({ zipcode })}
                            />
                        </div>
                        <button onClick={() => this.request()}>GO</button>
                    </div>

                    { election && (
                        <div>
                            <h1>Your next vote is the {election.name}</h1>
                            <h3>Representatives up for re-election</h3>
                            <ul>
                                { election.reps && election.reps.map(({ firstName, lastName, title }) =>
                                    <li key={lastName}>
                                        <Representative
                                            firstName={firstName}
                                            lastName={lastName}
                                            title={title}
                                        />
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default App
