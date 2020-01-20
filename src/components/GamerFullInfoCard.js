import React from "react";

class GamerFullInfoCard extends React.Component {
    render() {
        const { uid, name, image, mainclass, location, tourneycount, email, discord, stream, twitter, notes } = this.props.details;
        return(
            <li>
                <h3>{name}</h3><span>uid: {uid}</span>
                <img src={image} alt={name}/>
                <div>{location}</div>
                <div>{mainclass}</div>
                <div># of tournaments: {tourneycount}</div>
                <div>discord: {discord}</div>
                <div>email: {email}</div>
                <div>twitter: @{twitter}</div>
                <div>stream: {stream}</div>
                <p>notes: {notes}</p>
            </li>
        )
    }
}

export default GamerFullInfoCard;