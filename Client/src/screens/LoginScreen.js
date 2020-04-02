import React,{Component} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import io from 'socket.io-client';
import {Crypt} from 'hybrid-crypto-js';

var crypt = new Crypt({md:'sha256'});

class LoginScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      username:'',
      password:''
    }
  }

  componentDidMount(){
    this.socket = io("http://192.168.1.6:3000");  
  }



  componentWillUnmount(){
    
  }

  async Login(){
    
    this.socket.emit("ReqServerKey");
    console.log(1);
    await this.socket.on("ServerPublic",(key)=>{
      var publicKey = key;
      console.log(this.state.password);
      var encrypted = crypt.encrypt(publicKey,this.state.password);
      this.socket.emit("Credentials",{name:this.state.username, pword:encrypted});
    })
    alert("Login Successful!");
    // this.socket.close();
    this.props.navigation.navigate({routeName:"Options"});
  }

  render(){

    return(
      <View>
        <TextInput placeholder="Username" 
        value={this.username} 
        onChangeText={(uname)=>{this.setState({username:uname})}}
        />
        <TextInput placeholder="Password" value={this.password} 
        onChangeText={(pword)=>{this.setState({password:pword})}}
        />
        <TouchableOpacity onPress={()=>{
          this.Login();
          console.log("Login Successful");
          this.props.navigation.navigate({routeName:"Options"});
        }}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

export default LoginScreen;