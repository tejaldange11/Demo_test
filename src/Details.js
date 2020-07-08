import React,{Component} from 'react';
import {View,Text,TextInput,
    TouchableOpacity,Image,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

class Details extends Component{
    static navigationOptions = ({navigation}) => ({
        header: null,
    });
    constructor() {
        super();
        this.state={


        }
    }


    render(){
        const created_at = this.props.navigation.state.params.created_at,
            title = this.props.navigation.state.params.title,
            author = this.props.navigation.state.params.author,
            url = this.props.navigation.state.params.url
        return(
            <View style={{alignItems: 'center',marginTop:40}}>
                        <TouchableOpacity
                            style={{
                                marginTop: 10, margin: 20, borderWidth: 0.5, width: '100%',
                                height: 'auto',
                            }}>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{created_at}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{url}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{title}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 15}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{author}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

        )
    }
}


export default Details;
