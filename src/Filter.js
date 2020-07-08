import React,{Component} from 'react';
import {View,Text,TextInput,ActivityIndicator,
    TouchableOpacity,Image,FlatList} from 'react-native';
import {Column as Col} from "react-native-flexbox-grid";



class Filter extends Component {
    static navigationOptions = ({navigation}) => ({
        header: null,
    });

    constructor() {
        super();
        this.state = {
            dataSource: [],
            loading: false,
            page: 0,
            news: '',
            searchData: true,
            filterData: true,
            showfilterData: true,
            date: true

        }
    }

    ApiCall() {
        const {page, dataSource} = this.state;
        console.log("page", page)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
            .then(response => response.json())
            .then((responseJson) => {

                console.log("responseJson", JSON.stringify(responseJson.hits))
                this.setState({
                    loading: false,
                    dataSource: page === 1 ? responseJson.hits : [...dataSource, ...responseJson.hits],
                })
            })
            .catch(error => console.log(error)) //to catch the errors if any
    }

    componentDidMount() {
        console.log("componentDidMount")
        this.ApiCall()
        /* this.interval = setInterval(() => {
             this.ApiCall()
         }, 1000);*/
    }

    filterCreated_at(param) {
        const data = param.item
        /* console.log("data",JSON.stringify(data.author))
         const author1=[]
         // const created_at=data.created_at,title=data.title,author=data.author
         const data1=this.state.dataSource

         for(let i=0;i<data1.length;i++) {

             /!* data1[i].title*!/
             author1.push(data1)
             author1.sort();
             console.log("search", JSON.stringify(author1))
         }*/
        const data1 = this.state.dataSource
        console.log("length", JSON.stringify(data1.length));
        const author1 = []




        for (let i = 0; i < data1.length; i++){
            author1.push(data1[i].title)
        author1.sort();
        console.log("search", JSON.stringify(author1))
    }

        const created_at=data.created_at,title=data.title,author=data.author,url=data.url
        return(
            <View style={{alignItems:'center'}}>
                <TouchableOpacity
                   /* onPress={()=>
                        this.props.navigation.navigate('Details',{
                            created_at:data.created_at,
                            title:data.title,
                            author:data.author,
                            url:data.url
                        })}*/
                    style={{marginTop:10,borderWidth:0.3,width:'100%',
                        height:'auto',alignItems:'center',borderRadius:15
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
    render(){
        return(
            <View>
            <View style={{flexDirection:'row',marginLeft:10,marginRight:10}}>
                <TextInput
                    value={this.state.news}
                    onChangeText={(news)=>this.setState({news})}
                    placeholder={"title,URL and author name"}
                    placeholderTextColor={"#000"}
                    style={{width:'60%',height:45,borderWidth:0.5}}
                />
                <TouchableOpacity
                    onPress={()=>
                        this.search()}
                    style={{width:'20%',height:45,backgroundColor:'#ce4141',
                        alignItems:'center'}}>
                    <Image style={{height: 20, width: 20, marginTop:10, alignItems: 'center'}}
                           source={require('./search.png')}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=> this.setState({searchData:true,filterData:false,showfilterData:true})
                    }
                    style={{width:'20%',height:45,backgroundColor:'#a56060',
                        alignItems:'center'}}>
                    <Image style={{height: 30, width: 30, alignItems: 'center'}}
                           source={require('./dropdown.jpg')}/>
                </TouchableOpacity>

            </View>


        <FlatList
            data={this.state.dataSource}
            renderItem={item => this.filterCreated_at(item)}
            keyExtractor={item => item.id}

        />
            </View>
        )
    }
}


export default Filter
