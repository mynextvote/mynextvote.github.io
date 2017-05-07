import cxs from 'cxs'
import fetch from 'isomorphic-fetch'
import React, { Component } from 'react'

import ZipCodeInput from './ZipcodeInput'
import Representative from './Representative'

import { green } from './colors'

const HeroBanner = () =>
    <div className={cxs({ flex: '0 50%', textAlign: 'center', fontFamily: 'Merriweather' })}>
        <h1>My Next Vote</h1>
        <p>Your next vote could make all the difference. <br /> See when you can vote next and who you'll be voting for or against.</p>
    </div>

const RepresentativeList = ({ reps }) =>
    <ul className={cxs({ margin: 0, padding: 0, listStyleType: 'none' })}>
        { reps.map(({ firstName, lastName, title }) =>
            <li className={cxs({ marginBottom: '1em' })} key={lastName}>
                <Representative
                    firstName={firstName}
                    lastName={lastName}
                    title={title}
                />
            </li>
        )}
    </ul>

class App extends Component {
    state = {
        year: 2018, // this should be unnecessary eventually
        zipcode: ''
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
        const style = cxs({
            // switch to horizontal layout
            '@media (min-width: 40em)': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                flex: 1
            }
        })

        const { election, zipcode } = this.state

        return (
            <div className={style}>
                <HeroBanner />
                <div className={cxs({ flex: '0 50%', padding: '2em' })}>

                    <div className={cxs({ maxWidth: '42em', marginLeft: 'auto', marginRight: 'auto' })}>
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
                                <h1>Your next vote is the <span className={cxs({ color: green })}>{election.name}</span></h1>
                                <h3>Representatives up for re-election</h3>
                                { election && (
                                    <RepresentativeList reps={election.reps} />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default App
