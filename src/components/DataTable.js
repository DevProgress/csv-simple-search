import React from 'react';
import styles from './DataTable.css';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      wide: false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setWide.bind(this));
  }

  propsDidChange() {
    this.setWide();
  }

  setWide() {
    const columnCount = Object.keys(this.props.values[0] || {}).length;
    const windowWidth = window.innerWidth;
    const standardColumnWidth = 100
    if (columnCount * standardColumnWidth < windowWidth) {
      this.setState({
        wide: true
      });
    } else {
      this.setState({
        wide: false
      });
    }
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
      page: next >= Math.ceil(length / limit) ? page : next
    });
  }

  render() {
    let props = this.props,
        length = props.values.length,
        limit = props.limit,
        page  = this.state.page,
        start = page * limit,
        end = start + limit,
        values  = props.values.slice(start, end),
        columns = Object.keys(values[0] || {}),
        wide = this.state.wide;

    return (
      <div>
        <table className={'table table-responsive table-bordered ' + (wide ? styles.wide : styles.narrow)}>
          {(() => {
            if (wide) {
              return <thead>
                <tr>
                  {columns.map((col, i) => <th key={i}>{col}</th>)}
                </tr>
              </thead>;
            }
          })()}

          <tbody>
            {values.map((val, i) => (
              <tr key={i}>
                {columns.map((col, j) => <td key={j}>{wide ? '' : col + ':'} {val[col]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>

        <ul className="pager">
          <li className={page === 0 ? 'disabled' : ''}>
            <a onClick={this.prevPage.bind(this)}>Previous</a>
          </li>
          <li className={page + 1 >= Math.ceil(length / limit) ? 'disabled' : 0}>
            <a onClick={this.nextPage.bind(this)}>Next</a>
          </li>
        </ul>
      </div>
    )
  }
}

DataTable.propTypes = {
  limit: React.PropTypes.number.isRequired,
  values: React.PropTypes.array.isRequired
};
