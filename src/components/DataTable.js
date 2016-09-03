import React from 'react';
import styles from './DataTable.css';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      wide: false,
      sort: {
        column: '',
        order: 'asc',
      },
    };
    this.resize = this.resize.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    this.setState({
      sort: {
        column: this.props.headers[0],
        order: 'asc',
      },
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.values.length !== nextProps.values.length) {
      this.setState({
        page: 0,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  setSortState(col) {
    const { sort } = this.state;

    if (!sort.order) {
      sort.order = 'asc';
    }
    if (sort.order && sort.column === col) {
      sort.order = sort.order === 'asc' ? 'desc' : 'asc';
    }
    else {
      sort.order = 'asc';
    }

    sort.column = col;
    this.setState({ sort });
  }

  sortByOrder(column, sortOrder) {
    return (a, b) => {
      let result;
      if (a[column] < b[column]) {
        result = -1;
      }
      if (a[column] > b[column]) {
        result = 1;
      }
      if (a[column] === b[column]) {
        result = 0;
      }
      return result * sortOrder;
    };
  }

  sortRows(values) {
    const { sort: { column, order } } = this.state;
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortedValues = values.sort(this.sortByOrder(column, sortOrder));
    return sortedValues;
  }

  resize() {
    this.forceUpdate();
  }

  prevPage() {
    const prev = this.state.page - 1;
    this.setState({
      page: prev < 0 ? 0 : prev,
    });
  }

  nextPage() {
    const props = this.props;
    const limit = props.limit;
    const length = props.values.length;
    const page = this.state.page;
    const next = page + 1;

    this.setState({
      page: next >= Math.ceil(length / limit) ? page : next,
    });
  }

  render() {
    const props = this.props;
    const length = props.values.length;
    const limit = props.limit;
    const page = this.state.page;
    const start = page * limit;
    const end = start + limit;
    const values = this.sortRows(props.values).slice(start, end);
    const columns = props.headers;
    const standardColumnWidth = 100;
    const wide = (columns.length * standardColumnWidth < window.innerWidth);

    return (
      <div>
        <table className={'table table-responsive ' + (wide ? styles.wide : styles.narrow)}>
          {(() => {
            if (wide) {
              return (
                <thead>
                  <tr>
                    {columns.map((col, i) => {
                      let arrow;
                      if (col === this.state.sort.column) {
                        arrow = this.state.sort.order === 'asc' ?
                          <span>&#8593;</span> : <span>&#8595;</span>;
                      }
                      return (
                        <th key={i} className="table-header" onClick={() => this.setSortState(col)}>
                          {col} {arrow}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
              );
            }
            return undefined;
          })()}

          <tbody>
            {values.map((val, i) => (
              <tr key={i}>
                {columns.map((col, j) =>
                  <td key={j}>
                    {wide ? '' : <span>{col + ':'}</span>} {val[col]}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="pager">
          <li className={page === 0 ? 'disabled' : ''}>
            <a onClick={this.prevPage}>Previous</a>
          </li>
          <li className={page + 1 >= Math.ceil(length / limit) ? 'disabled' : 0}>
            <a onClick={this.nextPage}>Next</a>
          </li>
        </ul>
      </div>
    );
  }
}

DataTable.propTypes = {
  limit: React.PropTypes.number.isRequired,
  values: React.PropTypes.array.isRequired,
  headers: React.PropTypes.array.isRequired,
};
