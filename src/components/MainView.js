import React from 'react';
import Papa  from 'papaparse';
import Navbar from './Navbar';
import DataTable from './DataTable';
import Search from './Search'
import '../styles.css';

const propTypes = {

};

export default class MainView extends React.Component {

  constructor(props) {
    super(props);
    let data = [];
    this.state = {
      data: data,
      filteredData: data
    };
  }

  componentDidMount(){
    this.import();
  }

  import() {
    let fileName = 'default.csv';
    const param = 'file',
      regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(window.location.href);
    if (results) {
      fileName = decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    const path = '/csv/' + fileName;
    Papa.parse(path, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function(results) {
          this.parseCSV(results);
        }.bind(this),
        error: function(err, file, inputElem, reason)
        {
          console.log(err);
        },
    });
  }

  parseCSV(results) {
    this.setState({
      filteredData: results.data
    });
  }

  export(json) {
    let filename = "data.csv",
        csv = Papa.unparse(json),
        blob = new Blob([csv], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      let a = window.document.createElement("a");
      a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
      a.download = filename;
      document.body.appendChild(a);
      a.click();
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
        <Navbar />
    		<div className="container">
    			<div className="row">
    				<div className="col-sm-12">
            <div className="row">
              <div className="col-xs-8 col-sm-4">
                <Search data={data} onFilteredData={this.filterData.bind(this)} />
              </div>
              <div className="col-xs-4 pull-right">
                <a className="btn btn-primary pull-right" onClick={this.export.bind(this, filteredData)}>Export to CSV</a>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-xs-12">
                <DataTable limit={20} values={filteredData} />
              </div>
            </div>
    				</div>
    			</div>
    		</div>
      </div>
    );
  }
}

MainView.propTypes = propTypes;
