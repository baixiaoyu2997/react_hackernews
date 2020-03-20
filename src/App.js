import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      list: [
        {
          title: "React",
          url: "https://facebook.github.io/react/",
          author: "Jordan Walke",
          num_comments: 3,
          points: 4,
          objectID: 0
        },
        {
          title: "Redux",
          url: "https://github.com/reactjs/redux",
          author: "Dan Abramov, Andrew Clark",
          num_comments: 2,
          points: 5,
          objectID: 1
        }
      ]
    };
  }
  onDismiss = id => {
    this.setState({
      list:this.state.list.filter(x=>x.objectID!==id)
    })
  };
  onSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Search
            value={this.state.searchTerm}
            onChange={this.onSearchChange}
          />
          <Table
            list={this.state.list}
            pattern={this.state.searchTerm}
            onDismiss={this.onDismiss}
          ></Table>
        </header>
      </div>
    );
  }
}
class Search extends Component {
  render() {
    return (
      <form>
        <input
          type="text"
          value={this.props.value}
          onChange={this.props.onChange}
        ></input>
      </form>
    );
  }
}
class Table extends Component {
  render() {
    console.log('in')
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list
          .filter(x => x.title.toLowerCase().includes(pattern.toLowerCase()))
          .map(item => {
            return (
              <div key={item.objectID}>
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>
                <span>{item.author}</span>
                <span>{item.num_comments}</span>
                <span>{item.points}</span>
                <span>
                  <button
                    onClick={() => onDismiss(item.objectID)}
                    type="button"
                  >
                    Dismiss
                  </button>
                </span>
              </div>
            );
          })}
      </div>
    );
  }
}
export default App;
