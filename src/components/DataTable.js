import React from 'react';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  prevPage() {
    let prev = this.state.page - 1;
    this.setState({
      page: prev < 0 ? 0 : prev
    });
  }

  nextPage() {
    let props  = this.props,
        limit  = props.limit,
        length = props.values.length,
        page = this.state.page,
        next = page + 1;

    this.setState({
      page: next > Math.ceil(length / limit) ? page : next
    });
  }

  render() {
    let props = this.props,
        limit = props.limit,
        page  = this.state.page,
        start = page * limit,
        end = start + limit,
        values  = props.values.slice(start, end),
        columns = Object.keys(values[0] || {});

    return (
      <div>
        <table id="DataTable">
          <thead>
            <tr>
              {columns.map((col, i) => <th key={i}>{col}</th>)}
            </tr>
          </thead>

          <tbody>
            {values.map((val, i) => (
              <tr key={i}>
                {columns.map((col, j) => <td key={j}>{val[col]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pager">
          <a onClick={this.prevPage.bind(this)}>&larr;</a>

          <a onClick={this.nextPage.bind(this)}>&rarr;</a>
        </div>
      </div>
    )
  }
}

DataTable.propTypes = {
  limit: React.PropTypes.number.isRequired,
  values: React.PropTypes.array.isRequired
};
