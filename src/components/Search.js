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
    const value = e.target.value,
          keywords = e.target.value.toLowerCase().split(' ');

    this.props.onFilteredData(_.filter(this.props.data, function (row) {
      const values = _.values(row);
      const words = _.join(values, ' ').toLowerCase();

      const matches = _.map(keywords, function(keyword){ 
        return _.includes(words, keyword);
      });

      return _.every(matches);
    }));
  }

  render() {
    return <div>
      <input className="form-control" placeholder="Enter a Keyword, City, or State" onChange={this.onChange.bind(this)} />
    </div>;
  }
}

Search.propTypes = propTypes;
