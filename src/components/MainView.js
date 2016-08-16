import React from 'react';
import Papa  from 'papaparse';
import Navbar from './Navbar';
import DataTable from './DataTable';
import Search from './Search'
import Spinner from 'react-spinner';
import 'react-spinner/react-spinner.css';
import '../styles.css';


const propTypes = {

};

export default class MainView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      filteredData: undefined,
      dataSource: '',
      isError: false
    };
  }

  componentDidMount(){
    this.import();
  }

  getQueryStringParam(name){
    let value = null;
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(window.location.href);
    if (results) {
      value = decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    return value;
  }

  getExternalFileUrl(){
    return this.getQueryStringParam('externalFileUrl');
  }

  getLocalFileName(){
    let file = this.getQueryStringParam('file');
    if (!file){
      file = 'default.csv';
    }
    return file;
  }

  import() {

    const localFolder = './csv/'
    const localFileName = this.getLocalFileName();
    let path = localFolder + localFileName;

    const externalFileUrl = this.getExternalFileUrl();
    if (externalFileUrl){
      path = externalFileUrl;
    }

    this.setState({
      dataSource: path
    });

    Papa.parse(path, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: function(results) {
        this.parseCSV(results);
      }.bind(this),
      error: function(err, file, inputElem, reason)
      {
        this.setState({
          isError: true
        });
      }.bind(this),
    });
  }

  parseCSV(results) {
    this.setState({
      data: results.data,
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
    const data = this.state.data,
      filteredData = this.state.filteredData,
      dataSource = encodeURI(this.state.dataSource),
      isError = this.state.isError

    return (
      <div>
        <Navbar />
        {(() => {
          if (!this.state.data) {
            return <Spinner />;
          } else {
            return <main className="container">
              <div className={"row " + (isError ? '' : 'hidden')}>
                <div className="col-sm-12">
                  <div className="alert alert-danger alert-dismissible" role="alert">
                    <strong>Oh snap!</strong> We had some issues resolving the data source <a className="wrap" href={dataSource}>{dataSource}</a>.
                  </div>
                </div>
              </div>
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
            </main>;
          }
        })()}
      </div>
    );
  }
}

MainView.propTypes = propTypes;
