import React, { Component } from 'react';
import './App.css';
const family = [
  {
    id: 1,
    father: 'Sheebu',
    mother: 'Ditty',
    children: ['Lloyd', 'Leroy'],
  },
  {
    id: 2,
    father: 'Sheeju',
    mother: 'Ciny',
    children: ['John', 'Maria', 'Grace'],
  },
  {
    id: 3,
    father: 'Shimju',
    mother: 'Jiby',
    children: ['Suzane', 'Hazel', 'Izabel'],
  },
  {
    id: 4,
    father: 'Don',
    mother: 'Rose',
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      family,
      searchTerm: '',
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const updatedFamily = this.state.family.filter(f => f.id !== id);
    this.setState({ family: updatedFamily });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { family, searchTerm } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search:
          </Search>
        </div>
        <FamilyList
          family={family}
          searchterm={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({ onChange, value, children }) => (
  <form className="App-intro">
    <div>
      {children} <input type="text" onChange={onChange} value={value} />
    </div>
  </form>
);

const FamilyList = ({ family, searchterm, onDismiss }) => (
  <div className="table">
    {family
      .filter(f => f.father.toLowerCase().includes(searchterm.toLowerCase()))
      .map(f => (
        <div key={f.id} className="table-row">
          <span style={smallColumn}>Father: {f.father}</span>

          <span style={smallColumn}>Mother: {f.mother}</span>

          <span style={largeColumn}>
            Children:{' '}
            {typeof f.children === 'undefined'
              ? 'No kids'
              : f.children.toString()}{' '}
          </span>
          <span style={smallColumn}>
            <button onClick={() => onDismiss(f.id)} type="button" className="button">
              Dismiss
            </button>
          </span>
        </div>
      ))}
  </div>
);


const largeColumn = { width: '40%',
};
const smallColumn = { width: '20%',
};