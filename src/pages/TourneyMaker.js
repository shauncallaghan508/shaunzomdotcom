import React from "react";
import base from "../base";
import Header from "../views/Header";
import Footer from "../views/Footer";

class TourneyMaker extends React.Component {
    nameRef = React.createRef();
    dateRef = React.createRef();
    timeRef = React.createRef();
    prizeRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();
    prelimRef = React.createRef();
    playerrulesRef = React.createRef();
    directorrulesRef = React.createRef();

    state = {
        tourney: {}
    };

    callFirebase = tourney => {
        return new Promise(resolve => {
            base.push('tournament', {
                data: tourney
            }).then(newLocation => {
                this.props.history.push(`/darwin/tournament/${newLocation.key}`);
            }).catch(err => {
                console.log('shit broke');
            });
            // a 2s delay will make any latency problems really noticeable
            // setTimeout(resolve, 2000);
        });
    };

    createTourney = async e => {
        e.preventDefault();
        const tourney = {
            name: this.nameRef.current.value,
            date: this.dateRef.current.value,
            time: this.timeRef.current.value,
            prize: this.prizeRef.current.value,
            status: this.statusRef.current.value,
            desc: this.descRef.current.value,
            image: this.imageRef.current.value,
            prelims: this.prelimRef.current.value,
            playerRuleset: this.playerrulesRef.current.value,
            directorRuleset: this.directorrulesRef.current.value
        }
        this.setState({ tourney: tourney });
        await this.callFirebase(tourney);

    }

    render(){
        return(
            <main>
                <Header />
                <section className="tournament--info container">
                    <section className="tournament__header">
                        <h1>Build Your Tournament</h1>
                    </section>

                    <form className="create-tourney" onSubmit={this.createTourney}>
                        <div className="row">
                            <div className="col-12">
                                <label for="name">
                                    Tournament Name
                                </label>
                                <input
                                    className="form-control"
                                    name="name"
                                    ref={this.nameRef}
                                    type="text"
                                    placeholder="Tournament Name"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <label for="date">
                                    Tournament Date
                                </label>
                                <input
                                    className="form-control"
                                    name="date"
                                    ref={this.dateRef}
                                    type="date"
                                    placeholder="Tournament Date"
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="time">
                                    Tournament Time
                                </label>
                                <input
                                    className="form-control"
                                    name="time"
                                    ref={this.timeRef}
                                    type="text"
                                    placeholder="Tournament Time"
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="prize">
                                    Tournament Prize
                                </label>
                                <input
                                    className="form-control"
                                    name="prize"
                                    ref={this.prizeRef}
                                    type="text"
                                    placeholder="Prize Pool"
                                />
                            </div>
                            <div className="col-md-3">
                                <label for="status">
                                    Enrollment
                                </label>
                                <select className="form-control" name="status" ref={this.statusRef}>
                                    <option value="open">Open</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label for="image">Tournament Image</label>
                                <input
                                    className="form-control"
                                    name="image"
                                    type="text"
                                    placeholder="Tournament Image"
                                    ref={this.imageRef}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label for="desc">Event Description</label>
                                <textarea
                                    className="form-control"
                                    name="desc"
                                    placeholder="Event Description"
                                    ref={this.descRef}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label for="playerrules">Player Ruleset</label>
                                <textarea
                                    className="form-control"
                                    name="playerrules"
                                    placeholder="Player Ruleset"
                                    ref={this.playerrulesRef}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label for="directorrules">Director Ruleset</label>
                                <textarea
                                    className="form-control"
                                    name="directorrules"
                                    placeholder="Director Ruleset"
                                    ref={this.directorrulesRef}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <label for="prelims"># of Prelim Rounds</label>
                                <input
                                    className="form-control"
                                    name="prelims"
                                    type="text"
                                    placeholder="# of prelim rounds"
                                    ref={this.prelimRef}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <button type="submit" className="btn">Create Tournament</button>
                            </div>
                        </div>
                    </form>
                </section>
                <Footer />
            </main>
        )
    }
}

export default TourneyMaker;