import React,{Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button, StyleSheet} from 'react-native';
import io from 'socket.io-client';

const PORT = 8000;

class OptionsScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            event:'',
            location:''
        }
    }

    componentDidMount(){
        this.socket = io(`http://192.168.1.6:${PORT}`);
    }

    componentWillUnmount(){
        
    }

    async createRecord(){
        // this.socket = io(`http://192.168.1.6:${PORT}`);
        console.log("Record to be created");
        
        await this.socket.emit("Create",{Event:this.state.event, Location:this.state.location});
        this.socket.close();
        alert("Record Created");
        this.forceUpdate();

    }

    async deleteRecord(){
        // this.socket = io(`http://192.168.1.6:${PORT}`);
        console.log("Record to be deleted");
        await this.socket.emit("Delete",{Event: this.state.event, Location: this.state.location});
        this.socket.close();
        alert("Record Deleted");
        this.forceUpdate();
    }

    async updateRecord(){
        await this.socket.close();
        this.props.navigation.navigate({routeName:"Update"});
    }

    render(){
        return(
            <View>
                <TextInput 
                placeholder="Event"
                value={this.state.event}
                onChangeText={(val)=>{this.setState({event:val})}}
                />
                <TextInput 
                placeholder="Location" 
                value={this.state.location}
                onChangeText={(val)=>{this.setState({location:val})}}
                />
                <Button title="Create" onPress={()=>this.createRecord()}/>
                <Button title="Delete" onPress={()=>this.deleteRecord()}/>
                <TouchableOpacity style={{backgroundColor:"rgb(70, 187, 250)", marginTop:25}} onPress={()=>this.updateRecord()}><Text style={{textAlign:'center'}}>Press here to Update Records</Text></TouchableOpacity>
            </View>
        );
    }

}

export default OptionsScreen;