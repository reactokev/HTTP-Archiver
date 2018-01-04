import React, { Component } from 'react';
var event = new Event('build');

class Response extends Component {
  constructor(props) {
      super(props);
      this.state = {
          index: this.props.index,
          value: this.props.value,
          boxfill : this.props.boxfill,
          text: '#0000EE',
      }
  }

  componentWillMount() {
    window.addEventListener("MyEventType", (evt) => {
        this.setState({boxfill: evt.detail})
    }, false);
  }

  handleClick = (value, index) => {
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("MyEventType", true, true, index);
    window.dispatchEvent(evt);
    this.props.goto(value, index)
    this.setState({text: 'purple'}) 
  }

  render() {
      const  index  = this.state.index;
      const  value  = this.state.value;
    return (
        <div key={index} style={{display:'flex',border:'solid',borderTopWidth:0,borderBottomWidth:0.3,borderLeftWidth:0.3,borderRightWidth:.3,borderColor:'gray',backgroundColor: this.state.boxfill == index ? '#fafafa' : '#fff'}}>
                    <div style={{flex:.1,alignSelf:'center',backgroundColor:'#fff',paddingLeft:5,paddingBottom:5,paddingTop:5}}>
                       <p style={{fontSize:12,color: `${this.state.boxfill == index ? '#5fdba7' : '#000'}`}}>{value.startedDateTime.substring(11,22)}</p>
                    </div>
                    <div onClick={() => this.handleClick(value, index)} style={{cursor:'pointer',flex:.9,flexDirection:'column',boxShadow: this.state.boxfill == index ? 'inset 0.5px 0.5px 0.5px 0.5px gray' : 'none'}}>
                        <div style={{height:25,display:'flex',flexDirection:'row',border:'solid',paddingLeft:5,borderTopWidth:0,borderBottomWidth:0,borderLeftWidth:0.3,borderRightWidth:0,borderColor:'gray'}}>
                         <div style={{flex:.12,alignSelf:'center'}}>
                         <p style={{fontSize:12,color:'#3b5998'}}>{value.response.status}</p>
                         </div>
                         <div style={{flex:.12,alignSelf:'center'}}>
                         <p>-</p>
                         </div>
                         <div style={{flex:.12,alignSelf:'center'}}>
                         <p>-</p>
                         </div>
                         <div style={{flex:.60,alignSelf:'center'}}>
                         <p style={{fontSize:12}}>{parseInt(value.time)} ms</p>
                         </div>
                         {/* <div style={{flex:.04,alignSelf:'center'}}>
                         {this.state.boxfill == index ?
                         <p ><b>></b></p> :
                         <p style={{fontSize:12}}><b> </b></p>
                         }
                         </div> */}
                        </div>
                        <div style={{flexDirection:'row',display:'flex',height:25,border:'solid',paddingLeft:5,borderTopWidth:0,borderBottomWidth:0,borderLeftWidth:0.3,borderRightWidth:0,borderColor:'gray',}}>
                            <div style={{flex:.07,alignSelf:'center'}}>
                                <p style={{fontSize:14,color:`${value.request.method == 'GET' ? '#d8631f' : 'red'}`}}>{value.request.method}</p>
                            </div>
                            <div style={{flex:.93,alignSelf:'center',}}>
                            <p key={index} style={{fontSize:12,textDecoration:'none',overflow: 'hidden', textOverflow:'ellipsis',color: this.state.text}}>{value.request.url.length < 50 ? value.request.url : `${value.request.url.substring(0,75)}...`}</p>
                            </div>
                        </div>
                    </div>
                </div>
    );
  }
}

export default Response;