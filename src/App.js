import "./App.css";
import { Component } from "react";
import CharacterList from "./components/CharacterList";

class App extends Component {
  state = {
    characterList: [],
    current: "https://rickandmortyapi.com/api/character/?page=1",
    prev: "",
    next: "",
  };

  hendleFetch = () => {
    const { characterList } = this.state;
    const { current } = this.state;

    fetch(current)
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          prev: response.info.prev,
          next: response.info.next,
          characterList: [...characterList, ...response.results],
        });
      })
      .catch((error) => console.log(error));
  };

  componentDidMount = () => {
    this.hendleFetch();
  };

  componentDidUpdate = (_, prevState) => {
    console.log(prevState);
    this.state.current !== prevState.current && this.hendleFetch();
  };

  nextPage = () => {
    console.log(this.state.next);
    const { next } = this.state;

    this.setState({
      current: next,
      characterList: [],
    });
  };

  prevPage = () => {
    const { prev } = this.state;

    this.setState({
      current: prev,
      characterList: [],
    });
  };

  render() {
    return (
      <div className="App">
        {console.log(this.state.prev)}
        <CharacterList list={this.state.characterList}></CharacterList>
        <button
          onClick={this.prevPage}
          disabled={this.state.prev === null ? true : false}
        >
          prev
        </button>
        <button onClick={this.nextPage}>next</button>
      </div>
    );
  }
}
export default App;
