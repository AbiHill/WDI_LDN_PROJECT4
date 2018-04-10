import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class IndexRoute extends React.Component {
  //this is now a state property, because of the babel plugin you don't need to make a constructor and do this.propertyName but basically the same as this.state
  state = {
    events: []
  }

  componentDidMount(){
    axios.get('/api/events')
      .then(res => this.setState({ events: res.data }, () => console.log(this.state)));
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value }, () => console.log(this.state));
  }

  filterEvents = () => {
    //make a regex
    const regex = new RegExp(this.state.search, 'i');
    //use _.filter to filter the events
    const filtered = _.filter(this.state.events, (event) => regex.test(event.name));
    return filtered;
  }

  render() {
    return(
      <div className="container">
        <form>
          <div className="field">
            <input onChange={this.handleChange} className="input" type="text" name="search" placeholder="Search "/>
          </div>
        </form>
        <ul className="columns is-multiline">
          {this.filterEvents().map((event, i) =>
            <li key={i} className="column is-one-third">
              <Link to={`/events/${event._id}`}>
                <div className="card">
                  <div className="card-content">
                    <img src={`${event.image}`} />
                    <h2 className="title is-4">{event.name}</h2>
                    <h3 className="title is-4">{event.sport}</h3>
                    {/* splitting the date below */}
                    {/* <p className="title is-4">{event.dateTime.split('T')[0].split('-')[2]}/{event.dateTime.split('T')[0].split('-')[1]}/{event.dateTime.split('T')[0].split('-')[0]}</p> */}
                  </div>
                </div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default IndexRoute;
