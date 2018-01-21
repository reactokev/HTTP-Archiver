import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Routto from './components/Routto';

export default class App extends Component {
  // static contextTypes = {
  //   router: PropTypes.object
  // }
  constructor(props) {
    super(props);
  }
  render() {
    return (
    <div>
       <div style={{width:'100%',height:'60px',backgroundColor:'#3b5998',display:'flex',alignItems:'center'}}>
        <h1 style={{margin:0,color:'#fff',paddingLeft:30,fontFamily:'italic'}}>HTTP <span style={{fontSize:28}}>Archiver</span></h1>
    </div>
    <div  style={{display:'flex',justifyContent:'center',flexDirection:'row',flexWrap:'wrap',height:'100%',width:'100%',marginTop: (window.innerHeight / 2) - 150}}>
      <div onClick={() => this.props.history.push('/SingleLink')} style={{flex:1,margin:30,height:200,backgroundColor:'#fafafa',cursor:'pointer',boxShadow:'0.5px 0.5px 0.5px 0.5px #888888'}}>
      <h1><p style={{textAlign:'center'}}>URL</p></h1>
      <p style={{textAlign:'center',marginLeft:10,marginRight:10}}>
        Click to retrive HAR details of a single page by passing a valid URL  →
      </p>
      </div>
      <div onClick={() => this.props.history.push('/Facebook')} style={{flex:1,margin:30,height:200,backgroundColor:'#fafafa',cursor:'pointer',boxShadow:'0.5px 0.5px 0.5px 0.5px #888888'}}>
      <h1><p style={{textAlign:'center'}}>Facebook Login</p></h1>
      <p style={{textAlign:'center',marginLeft:10,marginRight:10}}>
        Click to retrive HAR details of a Facebook login page by passing user credentials such as username and password →
      </p>
      </div>
      <div onClick={() => this.props.history.push('/Google')} style={{flex:1,margin:30,height:200,backgroundColor:'#fafafa',cursor:'pointer',boxShadow:'0.5px 0.5px 0.5px 0.5px #888888'}}>
      <h1><p style={{textAlign:'center'}}>Google Search</p></h1>
      <p style={{textAlign:'center',marginLeft:10,marginRight:10}}>
        Click to retrive HAR details of custom Google search page by passing a string →
      </p>
      </div>
    </div>
    </div> 
    );
  }
}

