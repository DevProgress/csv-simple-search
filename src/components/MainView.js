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
    var filename = "data.csv";
    var csv = Papa.unparse(json);
    var blob = new Blob([csv], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob)  // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
      window.navigator.msSaveBlob(blob, filename);
    else
    {
      var a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = filename;
      document.body.appendChild(a);
      a.click();  // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
      document.body.removeChild(a);
    }    
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
