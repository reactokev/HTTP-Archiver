import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Response from './Response';
var obj = require('./jsonHAR.json');
var ip = require('ip');

class SingleLink extends Component {
  constructor(props) {
      super(props);
      this.state = { data: [],
        width: window.innerWidth,
        height: window.innerHeight,
        boxfill: null,
        status: 0,
        ip: null,
        box: '#fff',
        value: '',
        latitude: null,
        longitude: null,
        statedata: null,
        buttonActive: '#fafafa',
        buttonInactive: '#fff',
        marker: 1,
        marker1b: {
            weight: 'bold'
        },
        marker2b: {
            weight: 'normal'
        },
        marker3b: {
            weight: 'normal'
        },
        marker4b: {
        weight: 'normal'
        },
        marker1: {
            borderTopWidth: 0.3,
        borderBottomWidth: 0,
        borderLeftWidth: 0.3,
        borderRightWidth: 0.3
        },
        marker2: {
            borderTopWidth: 0,
        borderBottomWidth: 0.3,
        borderLeftWidth: 0,
        borderRightWidth: 0
        },
        marker3: {
            borderTopWidth: 0,
        borderBottomWidth: 0.3,
        borderLeftWidth: 0,
        borderRightWidth: 0
        },
        marker4: {
            borderTopWidth: 0,
        borderBottomWidth: 0.3,
        borderLeftWidth: 0,
        borderRightWidth: 0
        },
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.setState({data: obj.entries})
      this.location();
      this.ip();
  }

  ip = async () => {
    await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(result => {
      //   this.state.data.length != 0 ? alert('Waiting for page to load') : alert('Waiting for page to load');
      this.setState({ip: result.ip})
      })
  }

  location = async () => {
      await navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        }
      )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  urlPost = () => {
        fetch('http://localhost:3000/api/post', {headers: new Headers({
        'Content-Type': 'application/json'
    }), method: 'POST', body: 
    JSON.stringify({
      "url": `${this.state.value}`
  }) })
    .then((res) => {
      this.Node();
    }).catch((error) => {
        console.error(error);
      });
  }

  handleSubmit = (url) => {
    var valid = validator.isURL(url,['http','https','ftp']);
    valid == true ?
    // fetch(`${url}`)
    //   .then(res => res.status == 200 ? this.urlPost(): alert("Not a valid URL"))
    //   .catch((error) => {
    //     alert("Invalid URL fetch");
    //   })
    this.urlPost():
    alert('Invalid URL regex');
    }

  Node = async () => {
    this.setState({data: [],statedata: null})
    await fetch('/api/get/url')
      .then(res => res.json())
      .then(passwords => {
          this.setState({ data: passwords.entries });
        //   this.state.data.length != 0 ? alert('Waiting for page to load') : alert('Waiting for page to load');
        console.log(this.state.data)
        })
      .catch((error) => {
        alert(error);
      });
      
  }

  goto(value, index) {
      this.setState({statedata: value})
  }

  render() {
    const parsedData = this.state.data;
    return (
    <div style={{backgroundColor:'#fff'}}>
    <div style={{width:'100%',height:'60px',backgroundColor:'#3b5998',display:'flex',alignItems:'center'}}>
        <h1 style={{margin:0,color:'#fff',paddingLeft:30,fontFamily:'italic',}}>HTTP <span style={{fontSize:28}}>Archiver</span></h1>
    </div>
    <div style={{width:'50%',height:'50px',marginLeft:10,paddingTop:"1px"}}>
    <p ><i>Enter the URL</i> <span><input style={{width:'50%',padding:5}}  type="text" value={this.state.value} placeholder='format: https|http://facebook.com' onChange={this.handleChange} /><button style={{padding:5}} onClick={() => this.handleSubmit(this.state.value)} value="Submit">Submit</button></span></p>
    </div>
    {/* <div style={{width:'100%',height:'20px',marginLeft:10,paddingTop:0,}}> onKeyPress={event.keyCodey == 13 ? () => this.handleSubmit(this.state.value) : false}
        <p style={{fontSize:14}}>Client IP adress:{this.state.ip}   Location: lat-{this.state.latitude}, lon-{this.state.longitude}</p>
    </div> */}
    <div style={{display:'flex',flexDirection:'row',marginTop:10}}>
        <div style={{flex:1,marginLeft:10,marginRight:10,width:'50%',border:"solid",borderWidth:.3,borderColor:'gray',boxShadow:'0.5px 0.5px 0.5px 0.5px #888888'}}>
            <div style={{display:'flex',flexDirection:'row',border:'solid',borderTopWidth:0.3,borderBottomWidth:0.3,borderLeftWidth:0.3,borderRightWidth:.3,borderColor:'gray',height:35}}>
                <div style={{flex:.1,paddingLeft:5}}>
                    <p style={{fontSize:12,color:'rgb(0,150,136)'}}>Time</p>
                </div>
                <div style={{flex:.1,paddingLeft:5}}>
                    <p style={{fontSize:12,color:'rgb(0,150,136)'}}>Response</p>
                </div>
                <div style={{flex:.1,paddingLeft:5}}>
                    <p style={{fontSize:12,color:'rgb(0,150,136)'}}>Res.size</p>
                </div>
                <div style={{flex:.1,paddingLeft:5}}>
                    <p style={{fontSize:12,color:'rgb(0,150,136)'}}>Req.size</p>
                </div>
                <div style={{flex:.6,paddingLeft:5}}>
                    <p style={{fontSize:12,color:'rgb(0,150,136)'}}>Total time</p>
                </div>
            </div>
            {parsedData.length != 0 ?
                <div style={{overflowX:'hidden',height:'600px'}}> {
                parsedData.map((value, index) =>
                <Response index={index} value={value} goto={this.goto.bind(this)} boxfill={this.state.boxfill} />
                )
            }
            </div> :
            <div style={{overflowX:'hidden',height:'600px',display:'flex',justifyContent:"center",alignItems:'center'}}> 
            <p>Please enter a valid URL in the above given field</p>
            </div>
            }
        </div>
        {this.state.statedata ? 
        <div style={{flex:1,marginLeft:10,marginRight:10,width:'50%'}}>
            <div style={{display:'flex',flexDirection:'row',flex:.1,}}>
                <div 
                onClick={() => this.setState(
                    {
                        marker1b: {
                            weight: 'bold'
                        },
                        marker2b: {
                            weight: 'normal'
                        },
                        marker3b: {
                            weight: 'normal'
                        },
                        marker4b: {
                        weight: 'normal'
                        },
                        marker: 1,
                        marker1: {
                            borderTopWidth: 0.3,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0.3,
                        borderRightWidth: 0.3
                        },
                        marker2: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker3: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker4: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        }

                    })}
                style={{
                            border:'solid',
                            borderTopWidth: this.state.marker1.borderTopWidth,
                            borderBottomWidth: this.state.marker1.borderBottomWidth,
                            borderLeftWidth:this.state.marker1.borderLeftWidth,
                            borderRightWidth: this.state.marker1.borderRightWidth,
                            backgroundColor: this.state.marker == 1 ? `${this.state.buttonActive}` : `${this.state.buttonInactive}`,
                            borderColor:'gray',width:'10%',height:35,fontSize:12,textAlign:'center',fontWeight: this.state.marker1b.weight,cursor:'pointer'}}>
                    <p>Request</p>
                </div>
                <div 
                onClick={() => this.setState(
                    {
                        marker1b: {
                            weight: 'normal'
                        },
                        marker2b: {
                            weight: 'bold'
                        },
                        marker3b: {
                            weight: 'normal'
                        },
                        marker4b: {
                        weight: 'normal'
                        },
                        marker: 2,
                        marker1: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker2: {
                            borderTopWidth: 0.3,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0.3,
                        borderRightWidth: 0.3
                        },
                        marker3: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker4: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        }
                    })}
                style={{
                            border:'solid',
                            borderTopWidth: this.state.marker2.borderTopWidth,
                            borderBottomWidth: this.state.marker2.borderBottomWidth,
                            borderLeftWidth:this.state.marker2.borderLeftWidth,
                            borderRightWidth: this.state.marker2.borderRightWidth,
                            backgroundColor: this.state.marker == 2 ? `${this.state.buttonActive}` : `${this.state.buttonInactive}`,
                            borderColor:'gray',
                            width:'10%',height:35,
                            textAlign:'center',
                            fontSize:12,
                            fontWeight: this.state.marker2b.weight,
                            cursor:'pointer'}}>
                    <p>Response</p>
                </div>
                <div 
                onClick={() => this.setState(
                    {
                        marker1b: {
                            weight: 'normal'
                        },
                        marker2b: {
                            weight: 'normal'
                        },
                        marker3b: {
                            weight: 'bold'
                        },
                        marker4b: {
                        weight: 'normal'
                        },
                        marker: 3,
                        marker1: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker2: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker3: {
                            borderTopWidth: 0.3,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0.3,
                        borderRightWidth: 0.3
                        },
                        marker4: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        }
                    })}
                style={{
                            border:'solid',
                            borderTopWidth: this.state.marker3.borderTopWidth,
                            borderBottomWidth: this.state.marker3.borderBottomWidth,
                            borderLeftWidth:this.state.marker3.borderLeftWidth,
                            borderRightWidth: this.state.marker3.borderRightWidth,
                            backgroundColor: this.state.marker == 3 ? `${this.state.buttonActive}` : `${this.state.buttonInactive}`,
                            borderColor:'gray',
                            width:'10%',height:35,
                            fontSize:12,
                            textAlign:'center',
                            fontWeight: this.state.marker3b.weight,
                            cursor:'pointer'
                            }}>
                    <p >Cookies</p>
                </div>
                <div 
                onClick={() => this.setState(
                    {
                        marker1b: {
                            weight: 'normal'
                        },
                        marker2b: {
                            weight: 'normal'
                        },
                        marker3b: {
                            weight: 'normal'
                        },
                        marker4b: {
                        weight: 'bold'
                        },
                        marker: 4,
                        marker1: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker2: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker3: {
                            borderTopWidth: 0,
                        borderBottomWidth: 0.3,
                        borderLeftWidth: 0,
                        borderRightWidth: 0
                        },
                        marker4: {
                            borderTopWidth: 0.3,
                        borderBottomWidth: 0,
                        borderLeftWidth: 0.3,
                        borderRightWidth: 0.3
                        }
                    })}
                style={{
                            border:'solid',
                            borderTopWidth: this.state.marker4.borderTopWidth,
                            borderBottomWidth: this.state.marker4.borderBottomWidth,
                            borderLeftWidth:this.state.marker4.borderLeftWidth,
                            borderRightWidth: this.state.marker4.borderRightWidth,
                            backgroundColor: this.state.marker == 4 ? `${this.state.buttonActive}` : `${this.state.buttonInactive}`,
                            borderColor:'gray',
                            width:'10%',
                            height:35,
                            fontSize:12,
                            textAlign:'center',
                            fontWeight: this.state.marker4b.weight,
                            cursor:'pointer'
                            }}>
                    <p >Timing</p>
                </div>
                <div style={{width:"60%",border:'solid',
                borderTopWidth: 0,
                borderBottomWidth: 0.3,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderColor:'gray'}}>
                </div>
            </div>
            {/* border:'solid',borderTopWidth:0,borderBottomWidth:.3,borderRightWidth:0.3,borderLeftWidth:0.3 */}
            <div style={{flex:.9,overflowX:'hidden',height:"600px",wordWrap:'break-word',
                }}>
                { this.state.marker == 1 ? 
                    <div style={{
                        border:"solid 1px",
                        borderTop: '0px',
                        borderColor: 'gray',
                        paddingLeft:5,
                        paddingRight:5,
                        paddingTop:'1px',
                        backgroundColor:'#fafafa',
                    }}>
                        <p style={{fontSize:14}}>Requested on {this.state.statedata.startedDateTime}</p>
                        <p style={{fontSize:14}}><b>General:</b></p>
                        <p style={{fontSize:13}}><i>Request URL:</i> {this.state.statedata.request.url}</p>
                        <p style={{fontSize:13}}><i>HTTP version:</i> {this.state.statedata.request.httpVersion}</p>
                        <p style={{fontSize:13}}><i>Request method:</i> {this.state.statedata.request.method}</p>
                        <p style={{fontSize:13}}><i>Remote Address:</i> {this.state.statedata.serverIPAddress}</p>
                        <p style={{fontSize:14}}><b>Headers:</b></p>
                        <div>
                            <ul>
                                <li><p style={{fontSize:13}}><b><i>Referer</i></b> {this.state.statedata.request.headers.map(val =>
                                val.name == 'referer' ? val.value : null)}</p></li>
                                <li><p style={{fontSize:13}}><b><i>User-Agent</i></b> {this.state.statedata.request.headers.map(val =>
                                val.name == 'user-agent' ? val.value : null)}</p></li>
                            </ul>
                        </div>
                    </div>: this.state.marker == 2 ? 
                    <div style={{
                        border:"solid 1px",
                        borderTop: '0px',
                        borderColor: 'gray',
                        paddingLeft:5,
                        paddingRight:5,
                        paddingTop:'1px',
                        backgroundColor:'#fafafa',
                                                               
                    }}>
                        <p><b>Server's response</b></p>
                        <p style={{fontSize:14}}><b>Full response:</b></p>
                        <p style={{fontSize:13}}><i>status</i>: {this.state.statedata.response.status} <i>statusText</i>: OK</p>
                        <p style={{fontSize:14}}><b>Headers:</b></p>
                        <div>
                            <ul>
                                {
                                    this.state.statedata.response.headers.map(val =>
                                        <li><p style={{fontSize:13}}><b><i>{val.name}</i></b>:<span style={{fontSize:13}}> {val.value}</span></p></li>)
                                }
                            </ul>
                        </div>
                        <p style={{fontSize:14}}><b>Cache:</b></p>
                        <div style={{backgroundColor:'#fff9c4',margin:20,display:'flex',justifyContent:"center",flexDirection:'column'}}>
                            <p style={{fontSize:13,marginLeft:10}}><b>Cache control</b></p>
                            <p style={{fontSize:13,marginLeft:15}}>Server's cache control ({this.state.statedata.response.headers.map(val => 
                            val.name == 'cache-control' ? val.value : null
                            )})</p>
                            {
                                this.state.statedata.cache == {} ? <p style={{fontSize:13,marginLeft:10}}>Cache data Available</p> : <div><p style={{fontSize:13,marginLeft:10}}><b>Cache data missing</b></p><p style={{fontSize:13,marginLeft:15}}>The cache information is missing from the entry</p></div>
                            }
                        </div>
                    </div> : this.state.marker == 3 ? 
                     <div style={{
                        border:"solid 1px",
                        borderTop: '0px',
                        borderColor: 'gray',
                        paddingLeft:5,
                        paddingRight:5,
                        paddingTop:'1px',
                        backgroundColor:'#fafafa',
                                                                   
                    }}>
                     <p><b>Entry cookies</b></p>
                     <p style={{fontSize:14}}><b>Cookies sent in the request</b></p>
                     <p>{this.state.statedata.request.cookies.length != 0 ? 
                     this.state.statedata.request.cookies.map((val, key) =>
                     <div>
                     <p style={{fontSize:14}}><i>Cookie data[{key}]</i></p>
                     <ul>
                         <li><p style={{fontSize:13}}><b><i>expires</i></b> <span>{JSON.stringify(val.expires)}</span></p></li>
                         <li><p style={{fontSize:13}}><b><i>httpOnly</i></b> <span>{JSON.stringify(val.httpOnly)}</span></p></li>
                         <li><p style={{fontSize:13}}><b><i>name</i></b> <span>{val.name}</span></p></li>
                         <li><p style={{fontSize:13}}><b><i>secure</i></b> <span>{JSON.stringify(val.secure)}</span></p></li>
                         <li><p style={{fontSize:13}}><b><i>value</i></b> <span>{val.value}</span></p></li>
                     </ul> 
                     </div>):
                     <p style={{fontSize:13,paddingLeft:10}}>No cookies available.</p>
                     }</p>
                     <p style={{fontSize:14}}><b>Cookies sent in the response</b></p>
                     <p>{this.state.statedata.request.cookies.length != 0 ? 
                     this.state.statedata.request.cookies.map((val, key) =>
                     <div>
                     <p style={{fontSize:14}}><i>Cookie data[{key}]</i></p>
                     <ul>
                     <li><p style={{fontSize:13}}><b><i>expires</i></b> <span>{JSON.stringify(val.expires)}</span></p></li>
                     <li><p style={{fontSize:13}}><b><i>httpOnly</i></b> <span>{JSON.stringify(val.httpOnly)}</span></p></li>
                     <li><p style={{fontSize:13}}><b><i>name</i></b> <span>{val.name}</span></p></li>
                     <li><p style={{fontSize:13}}><b><i>secure</i></b> <span>{JSON.stringify(val.secure)}</span></p></li>
                     <li><p style={{fontSize:13}}><b><i>value</i></b> <span>{val.value}</span></p></li>
                     </ul> 
                     </div>):
                     <p style={{fontSize:13,paddingLeft:10}}>No cookies available.</p>
                     }</p>
                    </div> : 
                        <div style={{
                            border:"solid 1px",
                            borderTop: '0px',
                            borderColor: 'gray',
                            paddingLeft:5,
                            paddingRight:5,
                            paddingTop:'1px',
                            backgroundColor:'#fafafa',
                                                                       
                        }}>
                        <p><b>Request times</b></p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>Blocked time:</i></b> {this.state.statedata.timings.blocked == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.blocked)}</p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>Connection time:</i></b> {this.state.statedata.timings.connect == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.connect)}</p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>DNS time:</i></b> {this.state.statedata.timings.dns == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.dns)}</p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>Send time:</i></b> {this.state.statedata.timings.send == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.send)}</p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>SSL time:</i></b> {this.state.statedata.timings.ssl == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.ssl)}</p>
                        <p style={{fontSize:14,paddingLeft:5}}><b><i>Wait time:</i></b> {this.state.statedata.timings.wait == -1 ? "Does not apply" : parseInt(this.state.statedata.timings.wait)}</p>
                    </div>
                }
            </div>
        </div> : parsedData.length == 0 ?
        <div>
        </div> :
         <div style={{flex:1,width: this.state.width / 2,margin:20,alignSelf:'center'}}>
         <p style={{textAlign:'center'}}>No data to display. Click any of the URL on the left to display relevent data.</p>
         </div>
        }
    </div>
    <div style={{width:'100%',marginLeft:10,}}>
    {/* <p style={{fontSize:14,}}>Listenting to <span style={{fontSize:14,fontFamily:'italic',color:'#3b5998'}}>{this.state.value == "" ? "..." : this.state.value}</span></p> */}
    <p style={{fontSize:13}}><b><i>Num. of requests:</i></b> {this.state.data.length == 0 ? 0 : this.state.data.length}
    <span style={{paddingLeft:25}}><b><i>clientIPAddress:</i></b> {this.state.data.length == 0 ? "unknown" : this.state.ip}
    <span style={{paddingLeft:25}}><b><i>Latitude:</i></b> {this.state.data.length == 0 ? "unknown" : this.state.latitude == null ? "unknown" : this.state.latitude}
    <span style={{paddingLeft:25}}><b><i>Longitude:</i></b> {this.state.data.length == 0 ? "unknown" : this.state.longitude == null ? "unknown" : this.state.longitude}</span></span></span></p>
    </div>
    </div>
    );
  }
}

export default SingleLink;