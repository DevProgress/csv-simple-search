import React from 'react';
import '../styles.css';

const propTypes = {

};

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        Hello DevProgress!
      </div>
    );
  }
}

MainView.propTypes = propTypes;
