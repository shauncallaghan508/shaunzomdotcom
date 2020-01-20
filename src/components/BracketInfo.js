import React from "react";

class BracketInfo extends React.Component {
    state = {
        editing: false
    }
    render() {
        return (
            <div>
                THIS IS BRACKET {this.props.details.tempid}
            </div>

        );
    }
}

export default BracketInfo;