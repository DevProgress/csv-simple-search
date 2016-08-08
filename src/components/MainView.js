import React from 'react';
import Papa  from 'papaparse';
import DataTable from './DataTable';
import '../styles.css';
import csvdata from '../../data/csv-simple-search-sample-data.csv';

const propTypes = {

};

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.import(csvdata)
    };
  }

  import(csv) {
    var results = Papa.parse(csv, {
      header: true,
      dynamicTyping: true
    });

    if (results.errors.length) {
      results.errors.forEach((err) => console.error(err));
    }

    return results.data;
  }

  render() {
    return (
      <div>
        Hello DevProgress!

        <DataTable limit={20} values={this.state.data} />
      </div>
    );
  }
}

MainView.propTypes = propTypes;
