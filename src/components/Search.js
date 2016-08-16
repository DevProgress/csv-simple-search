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
    var keywords = e.target.value.split(' ');
    this.props.onFilteredData(_.filter(this.props.data, function (row) {
      var values = _.values(row);
      var words = _.join(values, ' ');
      var matches = _.map(keywords, function(keyword){ 
        return _.includes(words, keyword);
      });
      return !(_.includes(matches, false));
    }));
  }

  render() {
    return <div>
      <input className="form-control" placeholder="Enter a Keyword, City, or State" onChange={this.onChange.bind(this)} />
    </div>;
  }
}

Search.propTypes = propTypes;
