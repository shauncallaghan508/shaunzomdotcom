import React from "react";
import PropTypes from 'prop-types'

class GamerListing extends React.Component {
    render() {
        return (
            <div className="gamer-listing">
                {this.props.gamerDetails.name}
            </div>
        )
    }
}

GamerListing.propTypes = {
    gamerDetails: PropTypes.object.isRequired
}

export default GamerListing;
