import React,{Component} from 'react';
import {View,Text,TextInput,
    TouchableOpacity,Image,FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

class News extends Component{
    constructor() {
        super();
        this.state={
            dataSource:[],
            news:'',
            search:true,
            created_at:'',
            title:'',
            author:'',
            url:'',
            countries:['uk']

        }
    }
    componentDidMount(){
        fetch("https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0")
            .then(response => response.json())
            .then((responseJson)=> {
                console.log("responseJson",JSON.stringify(responseJson.hits))
                this.setState({
                    loading: false,
                    dataSource: responseJson.hits
                })
            })
            .catch(error=>console.log(error)) //to catch the errors if any
    }
    renderItem(route){
        const data=route.item
        console.log("data",JSON.stringify(data.created_at))
        const created_at=data.created_at,title=data.title,author=data.author,url=data.url
        return(
            <View style={{alignItems:'center',}}>
                <TouchableOpacity
                    style={{marginTop:10,margin:20,borderWidth:0.5,width:'100%',
                        height:'auto',
                    }}>
                    <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:10}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{created_at}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{url}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{title}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:15}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{author}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }
    search(){
        const data=this.state.dataSource
        const i=0
        console.log("search",JSON.stringify(data[i].title))
        // const created_at=data.created_at,title=data.title,author=data.author

        for(let i=0;i<data.length;i++){

            if(data[i].author.includes(this.state.news)  ||data[i].author.includes(this.state.news)
                || data[i].created_at.includes(this.state.news)
            ){
                console.log("********",data[i].title)
                this.setState({
                    search:false,
                    title:data[i].title,
                    created_at:data[i].created_at,
                    author:data[i].author,
                    url:data[i].url
                })

            }
        }
    }
    render(){
        const data=this.state.dataSource
        const dropdown=[]

        /*  for(let i=0;i<data.length;i++){
              dropdown.push([data[i].created_at,data[i].title])
              console.log("render",JSON.stringify(dropdown))

              this.setState({
                  route:dropdown
              })
              }
  */
        return(
            <View>
                <View style={{alignItems:'center',marginTop:15}}>

                    <View style={{flexDirection:'row',marginLeft:20}}>
                        <TextInput
                            value={this.state.news}
                            onChangeText={(news)=>this.setState({news})}
                            placeholder={"title,URL and author name"}
                            placeholderTextColor={"#000"}
                            style={{width:'60%',height:45,borderWidth:0.5}}
                        />
                        <TouchableOpacity
                            onPress={()=> this.search()}
                            style={{width:'20%',height:45,backgroundColor:'#ce4141',
                                alignItems:'center'}}>
                            <Image style={{height: 20, width: 20, marginTop:10, alignItems: 'center'}}
                                   source={require('./search.png')}/>
                        </TouchableOpacity>

                        <DropDownPicker
                            items={[
                                {label: 'title', value: this.state.search},
                                {label: 'created_at', value:!this.state.search},
                            ]}
                            defaultValue={this.state.country}
                            containerStyle={{width:'25%',height:45,}}
                            style={{backgroundColor: '#fafafa'}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => this.setState({
                                country: item.value
                            })}
                        >
                            {/*  <Image style={{height: 30, width: 30, alignItems: 'center'}}
                               source={require('./dropdown.jpg')}/>*/}
                        </DropDownPicker>
                    </View>
                </View>
                {this.state.search ?
                    <View style={{marginTop:60}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.id}

                        />
                    </View>
                    :

                    <View style={{alignItems: 'center',}}>
                        <TouchableOpacity
                            style={{
                                marginTop: 10, margin: 20, borderWidth: 0.5, width: '100%',
                                height: 'auto',
                            }}>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.created_at}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.url}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 15}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.author}</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}
export default News;
