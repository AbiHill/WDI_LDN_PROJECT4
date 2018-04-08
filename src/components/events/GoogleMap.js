/* global google */
import React from 'react';

class GoogleMap extends React.Component{

  componentDidMount(){
    const map = new google.maps.Map(this.mapDiv, {
      center: this.props.center,
      zoom: 18

    });
    new google.maps.Marker({
      position: this.props.center,
      map: map
    });
  }

  render(){
    return(
      <div className="google-map" ref={element => this.mapDiv = element}></div>
    );
  }
}

export default GoogleMap;
