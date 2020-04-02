import React,{Component} from 'react';
import {View, TextInput, TouchableOpacity, Text, Button} from 'react-native';
import io from 'socket.io-client';

const PORT = 8000;

class UpdateScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            event:'',
            location:'',
            eve:'',
            loc:'',
        }
    }

    componentDidMount(){
        this.socket = io(`http://192.168.1.6:${PORT}`);
    }

    componentWillUnmount(){
        this.socket.close();
    }

    async updateRecord(){
        // this.socket = io(`http://192.168.1.6:${PORT}`);
        console.log("Record to be updated");
        
        await this.socket.emit("Update",{Event:this.state.event, Location:this.state.location, Eve:this.state.eve, Loc:this.state.loc});
        this.socket.close();
        alert("Record updated");
        this.forceUpdate();
    }

    render(){
        return(
            <View>
                <Text>Existing Data:</Text>
                <TextInput 
                placeholder="Event"
                value={this.state.eve}
                onChangeText={(val)=>{this.setState({eve:val})}}
                />
                <TextInput 
                placeholder="Location" 
                value={this.state.loc}
                onChangeText={(val)=>{this.setState({loc:val})}}
                />
                <Text>Data to be Updated:</Text>
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
                
                <Button title="Update" onPress={()=>this.updateRecord()}/>
                
            </View>
        );
    }

}

export default UpdateScreen;