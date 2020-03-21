import React, { Component } from "react";
import "./App.css";

const DEFAULT_QUERY = "redux";
const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: ""
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }
  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault()
  };
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {
        ...this.state.result,
        hits: updatedList
      }
    });
  }
  setSearchTopStories = result => {
    this.setState({ result });
    console.log(this.state.result);
  };
  fetchSearchTopStories = searchTerm => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  };
  componentDidMount() {
    this.fetchSearchTopStories(this.state.searchTerm);
  }
  render() {
    const { searchTerm, result } = this.state;
    if (!result) return null;
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            搜索
          </Search>
        </div>
        {result && (
          <Table
            list={result.hits}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        )}
      </div>
    );
  }
}

const Search = ({ value, onChange, children,onSubmit }) => (
  <form onSubmit={onSubmit}>
   <input type="text" value={value} onChange={onChange} />
   <button type="submit"> {children} </button>
  </form>
);

const Table = ({ list, pattern, onDismiss }) => (
  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={{ width: "40%" }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: "30%" }}>{item.author}</span>
        <span style={{ width: "10%" }}>{item.num_comments}</span>
        <span style={{ width: "10%" }}>{item.points}</span>
        <span style={{ width: "10%" }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            已读
          </Button>
        </span>
      </div>
    ))}
  </div>
);

const Button = ({ onClick, className = "", children }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default App;
