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
    let results = Papa.parse(csv, {
      header: true,
      dynamicTyping: true
    });

    if (results.errors.length) {
      results.errors.forEach((err) => console.error(err));
    }

    return results.data;
  }

  export(json) {
    let csv  = Papa.unparse(json),
        blob = new Blob([csv], {type: 'text/csv'}),
        url  = window.URL.createObjectURL(blob),
        link = document.createElement('a'),
        evt  = document.createEvent('MouseEvents');

    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', 'data.csv');

    evt.initMouseEvent('click', true, true, document.defaultView, 1, 0, 0, 0, 0,
      false, false, false, false, 0, null);
    link.dispatchEvent(evt);
  }

  render() {
    let data = this.state.data;

    return (
      <div>
        Hello DevProgress!

        <DataTable limit={20} values={data} />

        <a onClick={this.export.bind(this, data)}>Export to CSV</a>
      </div>
    );
  }
}

MainView.propTypes = propTypes;
