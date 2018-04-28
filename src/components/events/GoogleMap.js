/* global google */
import React from 'react';

class GoogleMap extends React.Component{

  componentDidMount(){
    const map = new google.maps.Map(this.mapDiv, {
      center: this.props.center,
      zoom: 18,
      
      //SNAZZY MAPS STYLING
      styles: [
        {
          'featureType': 'all',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'saturation': 36
            },
            {
              'color': '#000000'
            },
            {
              'lightness': 40
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'color': '#000000'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'administrative',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 17
            },
            {
              'weight': 1.2
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 20
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 21
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 17
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 29
            },
            {
              'weight': 0.2
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 18
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 16
            }
          ]
        },
        {
          'featureType': 'transit',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 19
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#000000'
            },
            {
              'lightness': 17
            }
          ]
        }
      ]

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
