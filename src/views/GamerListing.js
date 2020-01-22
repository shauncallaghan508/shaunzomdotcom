import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class GamerListing extends React.Component {
    render() {
        return (
            <div className="gamer-listing">
                //THIS SHIT DONT WORK
                {this.props.gamerDetails.name}
            </div>
        )
    }
}

export default GamerListing;