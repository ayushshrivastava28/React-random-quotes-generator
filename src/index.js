import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const API ="https://programming-quotes-api.herokuapp.com/quotes";
const API2 = "https://programming-quotes-api.herokuapp.com/quotes/vote";
class App extends React.Component {
  state = {
    quotes: null,
    randomQuote: null
  };

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        this.setState({
          quotes: data,
          newVote: ""
        });
      });

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
  }

  starHandler = async () => {
    console.log("quote id", this.state.randomQuote._id);
    console.log("vote number", this.state.newVote);
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: this.state.randomQuote._id, newVote: this.state.newVote })
    };
    const response = await fetch(API2, requestOptions);
    const data = await response.json();
    console.log("data", data);
    this.setState({
      newVote: ""
    });
    this.randomQuoteHandler();
    //this.setState({ postId: data.id });
  }

  randomQuoteHandler = () => {
    const randNumb = Math.floor(Math.random() * this.state.quotes.length);
    const randomQuote = this.state.quotes[randNumb];

    this.setState({
      randomQuote
    });
  };

  render() {
    return (
      <div className="container">
        <div className="ui card">
          <div className="content">
            <div className="header">
              {this.state.randomQuote !== null && this.state.randomQuote.en}
            </div>
            <div className="description">
              {this.state.randomQuote !== null && this.state.randomQuote.author}
            </div>
            <br />
            <button
              className="ui black basic button"
              onClick={this.randomQuoteHandler}
            >
              Random Quotes
            </button>
            <input type="text" name="newVote" id="newVote" value={ this.state.newVote } onChange={ this.handleChange } >
            </input>
            <button
              className="ui black basic button"
              onClick={this.starHandler}
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
