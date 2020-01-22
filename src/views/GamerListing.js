import React from "react";
import PropTypes from 'prop-types'
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

GamerListing.propTypes = {
    gamerDetails: PropTypes.object.isRequired
}

export default GamerListing;