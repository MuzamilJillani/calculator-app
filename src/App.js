import "./styles.css";
import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      display: "",
      calculations: []
    };
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClick);
  }
  handleCalculation = () => {
    let arithmetic_eq = this.state.display.match(
      /[*/+-]|[0-9]+([.][0-9]*)?|[.][0-9]+/g
    );
    if (this.state.display.includes("=")) {
      arithmetic_eq = this.state.display.match(
        /(?<=[=])[+-]?[0-9]+([.][0-9]{2})?([*/+-][0-9]*([.][0-9]*)?)+$/g
      );
    }
    if (/[*/+-]$/g.test(this.state.display)) {
      arithmetic_eq.pop();
    }
    ///[*/+-]$/g.test(this.state.display) ? arithmetic_eq.pop() : null;
    console.log(arithmetic_eq);
    console.log(this.state.display);
    arithmetic_eq = arithmetic_eq.join(" ");
    let sum = eval(arithmetic_eq);
    sum = Number.isInteger(sum) ? sum : sum.toFixed(2);
    this.setState((prevState) => ({
      input: sum,
      display: prevState.display + "=" + sum,
      calculations: [...prevState.calculations, arithmetic_eq, "= " + sum]
    }));
  };

  handleClick = (e) => {
    if (e.target.className === "btn") {
      switch (e.target.id) {
        case "clear":
          this.setState({
            input: "0",
            display: ""
          });
          break;
        case "multiply":
        case "divide":
        case "subtract":
        case "add":
          if (
            /[*/]$/g.test(e.target.textContent) &
            (this.state.display === "")
          ) {
            break;
          } else {
            this.setState((prevState) => ({
              input: e.target.textContent,
              display: prevState.display + e.target.textContent
            }));
          }
          break;
        case "equals":
          this.handleCalculation();
          break;
        default:
          console.log(/(?<=[=])[+-]?[0-9]+$/.test(this.state.display));
          if (/(?<=[=])[+-]?[0-9]+[.]?[0-9]*$/.test(this.state.display)) {
            this.setState((prevState) => ({
              input: e.target.textContent,
              display: e.target.textContent
            }));
          } else {
            console.log(e.target.textContent);
            this.setState((prevState) => ({
              input:
                ((prevState.input > 0) | (prevState.input === ".")
                  ? prevState.input
                  : "") + e.target.textContent,
              display: prevState.display + e.target.textContent
            }));
          }
          break;
      }
    }
  };
  render() {
    return (
      <div className="App">
        <div id="container">
          <div id="display">
            <div>
              <ul>
                {this.state.calculations.map((calc, idx) => {
                  return <li key={idx}>{calc}</li>;
                })}
              </ul>
            </div>
            <div>{this.state.input}</div>
          </div>
          <div id="btn-section">
            <div id="clear" className="btn">
              AC
            </div>
            <div id="divide" className="btn">
              /
            </div>
            <div id="multiply" className="btn">
              *
            </div>
            <div id="seven" className="btn">
              7
            </div>
            <div id="eight" className="btn">
              8
            </div>
            <div id="nine" className="btn">
              9
            </div>
            <div id="subtract" className="btn">
              -
            </div>
            <div id="four" className="btn">
              4
            </div>
            <div id="five" className="btn">
              5
            </div>
            <div id="six" className="btn">
              6
            </div>
            <div id="add" className="btn">
              +
            </div>
            <div id="one" className="btn">
              1
            </div>
            <div id="two" className="btn">
              2
            </div>
            <div id="three" className="btn">
              3
            </div>
            <div id="equals" className="btn">
              =
            </div>
            <div id="zero" className="btn">
              0
            </div>
            <div id="decimal" className="btn">
              .
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
/* 
to fix,
1- equal double click
2- display overflow
3-replace arithmetic sign at the end
4- allow negative for first num entered
5-
*/
