import React from 'react';
import Papa  from 'papaparse';
import DataTable from './DataTable';
import Search from './Search'
import '../styles.css';
import csvdata from '../../data/csv-simple-search-sample-data.csv';

const propTypes = {

};

export default class MainView extends React.Component {
  constructor(props) {
    super(props);
    const data = this.import(csvdata);
    this.state = {
      data: data,
      filteredData: data
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

  filterData(data) {
    this.setState({
      filteredData: data
    });
  }

  render() {
    const data = this.state.data;
    const filteredData = this.state.filteredData;

    return (
      <div>
        <Search data={data} onFilteredData={this.filterData.bind(this)} />

        <DataTable limit={20} values={filteredData} />

        <a onClick={this.export.bind(this, filteredData)}>Export to CSV</a>
      </div>
    );
  }
}

MainView.propTypes = propTypes;
