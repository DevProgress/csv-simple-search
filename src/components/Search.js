import React from 'react';
import _ from 'lodash';

const propTypes = {
  data: React.PropTypes.array.isRequired,
  onFilteredData: React.PropTypes.func.isRequired
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange(e) {
    var value = e.target.value;
    this.props.onFilteredData(_.filter(this.props.data, function (row) {
      return _.find(_.values(row), function (val) {
        return (val.toLowerCase()).indexOf(value.toLowerCase()) !== -1;
      });
    }));
  }

  render() {
    return <div>
      <input onChange={this.onChange.bind(this)} />
    </div>;
  }
}

Search.propTypes = propTypes;
