import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
    return(
      <button className="square" onClick={props.onClick}>
      {props.value}
      </button>
    );
}

  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state={
        squares:Array(9).fill(null),
        xIsNext:true,
      };
    }
    renderSquare(i) {
      return <Square
       value={this.state.squares[i]}
      onClick={()=>this.handleclick(i)} />;
    }
    handleclick(i){
      const squares = this.state.squares.slice();
      if (checkwinner(squares) || squares[i]) {
        return;
      }
      if(this.state.xIsNext===true){
        squares[i] = 'X';
        this.setState({xIsNext:false});
      }
      else{
        squares[i] = 'O';
        this.setState({xIsNext:true});
      }
      this.setState({squares:squares});
    }
    render() {
      const winner=checkwinner(this.state.squares);
      let status;
      if(winner){
        status='Winner'+winner;
      }
      else{
        status = 'Next player:'+(this.state.xIsNext? "X":"O");
      }

      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }

function checkwinner(squares){
  var boardlist=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  /*
  for(var coordinate in boardlist){
      var xcount=0;
      var ocount=0;
      for(var i=0;i<3;i++)
      {
      if(squares[coordinate[i]]==="X")
      {
        xcount++;
        if(xcount===3)
        {
          return squares[coordinate[i]];
        }
      }
      else if(squares[coordinate[i]]==="O"){
        ocount++;
        if(ocount===3){
          return squares[coordinate[i]];
        }
      }
    }
  }
  */
  for (let i = 0; i < boardlist.length; i++) {
    const [a, b, c] = boardlist[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================
ReactDOM.render(<Game />, document.getElementById('root'));
//<button className="square" onClick={() => this.props.onClick({value : "X"  })}>
//{this.props.value}
