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
          quotes: data
        });
      });
  }
//   starHandler = () => {
//     async componentDidMount() {
//         // POST request using fetch with async/await
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ title: 'React POST Request Example' })
//         };
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts', requestOptions);
//         const data = await response.json();
//         this.setState({ postId: data.id });
//     }
    

//   }

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
            <input type="text" name="text_01" id="text_01"></input>
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
