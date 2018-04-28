/* global google */

//Google Autocomplete funcationality which is utilised on the registeration form and new event form

import React from 'react';

class AutoComplete extends React.Component {

  componentDidMount() {
    this.autocompleteInput = new google.maps.places.Autocomplete(this.input);
    this.autocompleteInput.addListener('place_changed', () => {
      const place = this.autocompleteInput.getPlace();
      this.props.onChange({
        target: {
          name: this.input.name,
          value: {
            address: place.formatted_address,
            location: place.geometry.location.toJSON()
          }
        }
      });
    });
  }

  render() {
    return (
      <input {...this.props} type="text" ref={element => this.input = element} />
    );
  }

}

export default AutoComplete;
