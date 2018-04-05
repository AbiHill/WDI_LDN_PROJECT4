import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <section>
        <h1>Scrimmage</h1>
      </section>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
