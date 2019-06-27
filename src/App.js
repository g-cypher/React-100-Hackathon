import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      data: [],
      kanye: ''
      };
      this.getKanye = this.getKanye.bind(this);
  }

  componentWillMount() {
    axios
    .get(`https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${ process.env.REACT_APP_NYTIMES_API_KEY }`)
    .then(response => response.data.results.books)
    .then(data => this.setState({ data }));
  
  }
  
  getKanye() {
    const reqURL = 'https://api.kanye.rest';
    axios.get(reqURL).then(res =>  { this.setState({ kanye: res.data.quote });
    });
  }

render() {
  return (
    <div className="App">
      <div className='container'>
        <div className='page-header border-bottom border-light'>
          <h2 className='text-white text-left'>Discover the Best in Fiction</h2>
          <h6 className='text-white text-left'>And fry your brain with quotes from Kanye West</h6>
        </div>
        <div className='row'>
          <div className='col-md-4'>
          <br></br>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">And Kanye Says: </label>
                  <h6>{ this.state.kanye }</h6>
                    <button type='button' className='btn btn-primary' onClick={ this.getKanye }>Lose faith in society</button>
              </div>
            </form>
          </div>
          <div className='col-md-8'>
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Title</th>
                  <th scope='col'>Author</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((book) => {
              return (
                <tr>
                    <td>{book.rank}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                </tr>
              )
          })}</tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
}

export default App;
