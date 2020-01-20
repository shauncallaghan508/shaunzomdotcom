import React from "react";
import base from "../base";

class TourneyMaker extends React.Component {
    nameRef = React.createRef();
    dateRef = React.createRef();
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
            <section>
                <h1>Build Your Tournament</h1>
                <form className="create-tourney" onSubmit={this.createTourney}>
                    <input name="name" ref={this.nameRef} type="text" placeholder="Tournament Name" />
                    <input name="date" ref={this.dateRef} type="text" placeholder="Tournament Date" />
                    <input name="prize" ref={this.prizeRef} type="text" placeholder="Prize Pool"/>
                    <select name="status" ref={this.statusRef}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                    <textarea name="desc" placeholder="Description of event" ref={this.descRef} />
                    <textarea name="playerrules" placeholder="Player Ruleset" ref={this.playerrulesRef} />
                    <textarea name="directorrules" placeholder="Director Ruleset" ref={this.directorrulesRef} />
                    <input name="Image" type="text" placeholder="Tournament Image" ref={this.imageRef} />
                    <input name="prelims" type="text" placeholder="# of prelim rounds" ref={this.prelimRef} />
                    <button type="submit">Create Tournament</button>
                </form>
            </section>
        )
    }
}

export default TourneyMaker;