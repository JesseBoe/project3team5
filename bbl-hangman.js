class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      answer: "swanz",
      choice: [],
      hp: 0,
    }
  }
  question() {
    let a = $("#a")
    let num = this.state.answer.length
    let test = this.state.answer.split("")
    console.log(test)
     if(test.indexOf(a.val()) === -1){
       this.setState({
         hp: this.state.hp + 1
       })
     }
    this.setState({
        choice: this.state.choice.concat(a.val())
       })
    

    a.val("")
  }
  componentDidUpdate() {
   // console.log("as")
    if(this.state.hp === 6){
      console.log("You lost")
      this.setState({
        hp: 'You lost'
      })
    }
  }
  alert() {
  var person = prompt("Please enter your name");
    this.setState({
        answer: person.toLowerCase()
    })
  
  }
  componentWillMount() {
    this.alert()
}
  render() {
    if(this.state.hp === 1){
    document.getElementById("head").style.visibility = "visible";
  }else if(this.state.hp === 2){
    document.getElementById("leftArm").style.visibility = "visible";
  }else if(this.state.hp === 3){
    document.getElementById("rightArm").style.visibility = "visible";
  }else if(this.state.hp === 4){
    document.getElementById("body").style.visibility = "visible";
  }else if(this.state.hp === 5){
    document.getElementById("leftLeg").style.visibility = "visible";
  }else if(this.state.hp === 6){
    document.getElementById("rightLeg").style.visibility = "visible";
  }
    let ar = this.state.answer.split("").map((val,i) => <Second item={val} val={this.state.choice}/>)
                                            
    return(
      <div>
        <div><span id="head">O</span></div>
        <div><span id="leftArm">-</span><span id="body">|</span><span id="rightArm">-</span></div>
        <div><span id="leftLeg">/</span><span id="rightLeg">\</span></div>
        <span>{this.state.choice}</span><br />
        <input id="a" placeholder=""></input>
        <button onClick={() => this.question()}>Enter</button>
        <h1>{this.state.hp}</h1>
        <div>{ar}</div>
      </div>
    )
  }
}
class Second extends React.Component {
  render() {
    return(
    <span>{this.props.val.indexOf(this.props.item) !== -1 ? this.props.item : '[]'}</span>
    )
  }
}


ReactDOM.render(<Main />, document.getElementById('app'))