import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ShortUrl from "./components/ShortUrl";

const API_URL = process.env.REACT_APP_API_URL;
class App extends Component {
  state = {
    urlInput: "",
    urlsArray: null,
    serverPath: "",
    isLoading: true
  };
  componentDidMount = async () => {
    try {
      const response = await axios.get(API_URL);
      await this.setState({ urlsArray: response.data.shortUrlList, serverPath: response.data.serverPath, isLoading: false });
    } catch (error) {
      console.log(error.response);
    }
  };
  updateDbCounter = async shortUrl => {
    try {
      const response = await axios.post(`${API_URL}/updatecounter`, { shortUrl: shortUrl });
      await this.setState({ urlsArray: response.data.shortUrlList });
    } catch (error) {
      console.log(error.response);
    }
  };
  handleUrlInput = event => {
    if (event.target.value.length > 0) {
      this.setState({
        urlInput: event.target.value
      });
    } else {
      this.setState({ urlInput: "" });
    }
  };
  // Mise à jour du compteur et de la base de données
  handleUrlClick = async (index, shortUrl) => {
    window.open(this.state.urlsArray[index].originalUrl, "_blank");
    this.updateDbCounter(shortUrl);
  };

  // Store a new Url in DB and display the full list in result
  handleButtonClick = async event => {
    event.preventDefault();
    const response = await axios.post(`${API_URL}/shortenurl`, { originalUrl: this.state.urlInput });
    await this.setState({ urlsArray: response.data.shortUrlList });
  };

  handleDeleteUrl = index => {};

  renderUrlList = () => {
    if (this.state.isLoading === false && this.state.urlsArray.length > 0) {
      return (
        <div className="urlListContainer">
          <div className="listHeader originalUrl">Original Url</div>
          <div className="listHeader shortUrl">Short Url</div>
          <div className="listHeader visits">Visits</div>
          {this.state.urlsArray.map((urlObj, i) => {
            return <ShortUrl {...urlObj} serverPath={this.state.serverPath} index={i} handleUrlClick={this.handleUrlClick} key={i} />;
          })}
        </div>
      );
    } else return null;
  };
  render() {
    return (
      <div className="main">
        <header>
          <div className="container">
            <h1>Simplify your links</h1>
            <form>
              <input type="text" placeholder="Your original URL here" value={this.state.urlInput} onChange={this.handleUrlInput} />
              <button onClick={this.handleButtonClick}>SHORTEN URL</button>
            </form>
          </div>
        </header>
        <div className="container">{this.renderUrlList()}</div>
      </div>
    );
  }
}

export default App;
