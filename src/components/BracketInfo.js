import React from "react";

class BracketInfo extends React.Component {
    state = {
        editing: false
    };

    handleChange = (event) => {
        const updatedBracket = {
            ...this.props.details,
            [event.currentTarget.name]: event.currentTarget.value
        };
        this.props.updateBracket(this.props.index, updatedBracket);
    };

    toggleEdit = () => {
        this.setState(editing => ({
            editing: !this.state.editing
        }));
    }

    render() {
        const { director, name, gamers, location, tempid } = this.props.details;
        return (
            <div>
                { this.state.editing &&
                    <div>
                        Bracket Name: <input name="name" type="text" placeholder="Bracket Name" value={name} onChange={this.handleChange}/>
                        Director: <input name="director" type="text" placeholder="Director Name" value={director} onChange={this.handleChange}/>
                        Location: <select name="location" value={location} onChange={this.handleChange}>
                                <option value="">Select Location</option>
                                <option value="NA East">NA East</option>
                                <option value="NA West">NA West</option>
                                <option value="EU">EU</option>
                            </select>
                        <button onClick={this.toggleEdit}>Save</button>
                    </div>
                }
                { !this.state.editing &&
                    <div>
                    <div>Bracket Name: {name}</div>
                    <div>Director: {director}</div>
                    <div>Location: {location}</div>
                    <button onClick={this.toggleEdit}>Edit</button>
                    </div>
                }
            </div>

        );
    }
}

export default BracketInfo;