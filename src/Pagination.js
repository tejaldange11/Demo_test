import React,{Component} from 'react';
import {View,Text,TextInput,ActivityIndicator,
    TouchableOpacity,Image,FlatList,ScrollView} from 'react-native';

import Details from "./Details";

class Pagination extends Component{
    static navigationOptions = ({navigation}) => ({
        header: null,
    });
    constructor() {
        super();
        this.state={
            dataSource:[],
            loading:false,
            page:0,
            news:'',
            searchData:true,
            filterData:true,
            showfilterData:true,
            date:true

        }
    }
    ApiCall(){
        const { page,dataSource } = this.state;
        console.log("page",page)
        fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`)
            .then(response => response.json())
            .then((responseJson)=> {

                console.log("responseJson",JSON.stringify(responseJson.hits))
                this.setState({
                    loading: false,
                    dataSource: page === 1 ? responseJson.hits : [...dataSource, ...responseJson.hits],
                })
            })
            .catch(error=>console.log(error)) //to catch the errors if any
    }
    componentDidMount(){
          console.log("componentDidMount")
         this.ApiCall()
       /* this.interval = setInterval(() => {
            this.ApiCall()
        }, 1000);*/
    }

    renderItem(route){
        const data=route.item
        console.log("data",JSON.stringify(data.created_at))
        const created_at=data.created_at,title=data.title,author=data.author,url=data.url
        return(
            <View style={{alignItems:'center',}}>
                <TouchableOpacity
                    onPress={()=>
                    this.props.navigation.navigate('Details',{
                        created_at:data.created_at,
                        title:data.title,
                        author:data.author,
                        url:data.url
                    })}
                    style={{marginTop:10,margin:20,borderWidth:0.5,width:'100%',
                        height:'auto',
                    }}>
                    <View style={{flexDirection: 'row',marginHorizontal:5,marginVertical:10,}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{created_at}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginHorizontal:5,marginVertical:5,}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{url}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginHorizontal:5,marginVertical:5,}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{title}</Text>
                    </View>
                    <View style={{flexDirection: 'row',marginHorizontal:5,marginVertical:5,}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                        <Text style={{fontSize: 12, marginLeft: 10}}>{author}</Text>
                    </View>

                </TouchableOpacity>
            </View>
        )
    }

    handleRefresh = () => {
        this.setState({
            loading: true,
        }, () => {
            this.ApiCall();
        });
    };

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        }, () => {
            this.ApiCall();
        });
    };

    indicator(){
        return(
            <View
            style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
            }}
        >
            <ActivityIndicator animating size="large" />
        </View>
        )
    }

    search(){
        const data=this.state.dataSource

        for(let i=0;i<data.length;i++){

            if(data[i].author.includes(this.state.news)  ||data[i].author.includes(this.state.news)
                            || data[i].created_at.includes(this.state.news)
                        )
            {
                            this.setState({
                                searchData:false,
                                title:data[i].title,
                                created_at:data[i].created_at,
                                author:data[i].author,
                                url:data[i].url,
                                news:''
                            })

                        }
        }
    }

    filterPostByDate(){
        const data=this.state.dataSource
        data.sort((a,b)=>(a.created_at <= b.created_at) ? 1: -1)
        {
            return (
                    <View style={{alignItems: 'center',}}>
                        <ScrollView style={{}}>
                        {data.map((records)=>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('Details', {
                                created_at: records.created_at,
                                title: records.title,
                                author: records.author,
                                url: records.url
                            })}
                        style={{
                            marginTop: 10, borderWidth: 0.3, width: '100%',
                            height: 'auto',  borderRadius: 15
                        }}>

                        <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:10}}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>{records.created_at}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>{records.url}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>{records.title}</Text>
                        </View>
                        <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:15}}>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                            <Text style={{fontSize: 12, marginLeft: 10}}>{records.author}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
                        </ScrollView>
                </View>

            )
        }


    }
    filterPostByAuthor(){
        const data=this.state.dataSource
        data.sort((a,b)=>(a.author <= b.author) ? 1: -1)
        {
            return (
                <View style={{alignItems: 'center',}}>
                    <ScrollView style={{}}>

                    {data.map((records)=>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Details', {
                                    created_at: records.created_at,
                                    title: records.title,
                                    author: records.author,
                                    url: records.url
                                })}
                            style={{
                                marginTop: 10, borderWidth: 0.3, width: '100%',
                                height: 'auto',  borderRadius: 15
                            }}>

                            <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:10}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{records.created_at}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{records.url}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10,marginRight:20}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{records.title}</Text>
                            </View>
                            <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:15}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{records.author}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    </ScrollView>

                </View>

            )
        }


    }

   /* filterCreated_at(param){
        const data=param.item
        console.log("data",JSON.stringify(data.author))
       /!* const author1=[]
        // const created_at=data.created_at,title=data.title,author=data.author
        const data1=this.state.dataSource
/!*
            data1.title.sort()
*!/
        for(let i=0;i<data1.length;i++) {
            data1.sort(function (a, b) {
                const orderBool = a.title > b.title;

                if (a.title.charAt(0) > b.title.charAt(0)) {
                    const test1 =data1[i]
                    data1[i]=data1[i+1]
                    data1[i+1]=test1
                }
                    console.log("##################",JSON.stringify(data1))
            });
        }
        for(let i=0;i<data1.length;i++) {
           /!* const a=a,b=b,c=a-b
            if(c0){
                console.log("##################")
            }
            else if (c < 0) {
                console.log("55555555")
            }*!/
         /!*   //data1[i].title.sort()
           author1.push(data1[i].title)
            if(author1[i].charAt(0) < author1[i+1].charAt(0)){
                console.log("##################")

            }
        else{
                console.log("55555555")
            }
            author1.sort();
            console.log("search", JSON.stringify(author1.length))

*!/
        }*!/
        const created_at=data.created_at,author=data.author,url=data.url
        data.sort((a,b)=>(a.author > b.author) ? 1: -1)
        {
            return (
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('Details', {
                                created_at: data.created_at,
                                title: data.title,
                                author: data.author,
                                url: data.url
                            })}
                        style={{
                            marginTop: 10, borderWidth: 0.3, width: '80%',
                            height: 35, alignItems: 'center', borderRadius: 15
                        }}>
                        {this.state.date ?
                            <View style={{flexDirection: 'row', margin: 10,}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{data.author}</Text>
                            </View>
                            :
                            <View style={{flexDirection: 'row', margin: 10}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                                <Text style={{fontSize: 12, marginLeft: 10}}>{data.author}</Text>
                            </View>
                        }

                    </TouchableOpacity>
                </View>
            )
        }
    }
*/
    render(){
        return(
              <View style={{marginTop:30}}>
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
                <View style={{marginTop:30}}>
                    {this.state.searchData ?
                        this.state.filterData ?
                            <View style={{alignItems:'center'}}>

                            <FlatList
                            data={this.state.dataSource}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.id}
                            onRefresh={this.handleRefresh}
                            onEndReached={this.handleLoadMore}
                            onEndThreshold={0}
                            refreshing={this.state.loading}
                            ListFooterComponent={this.indicator()}

                        />
                            </View>
                        :
                            this.state.showfilterData ?
                            <View style={{alignItems: 'center',height:'auto',backgroundColor:'#4f7789',marginTop:40
                                ,width:'70%',marginLeft:50}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold',color:'#fff'}}>Filter Post by:-</Text>

                                <TouchableOpacity
                                    onPress={()=> this.setState({searchData:true,filterData:false,showfilterData:false,
                                    date:true})
                                    }
                                    style={{
                                        marginTop: 20, margin: 20,  width: '50%',
                                        height: 'auto',backgroundColor:'#fff'
                                    }}>
                                    <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                                        <Text style={{fontSize: 12, color:'#000',marginLeft: 10}}>created_at</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=> this.setState({searchData:true,filterData:false,showfilterData:false,
                                        date:false})
                                    }
                                    style={{
                                        marginTop: 10, margin: 20,  width: '50%',
                                        height: 'auto',backgroundColor:'#fff'
                                    }}>
                                    <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10}}>
                                        <Text style={{fontSize: 12, color:'#000',marginLeft: 10}}>author</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                                :
                                this.state.date ?
                                    this.filterPostByDate()
                                    :
                                      this.filterPostByAuthor()



                        :
                        <View style={{}}>
                            <TouchableOpacity

                                style={{marginTop:10,borderWidth:0.5,width:'100%',
                                    height:'auto',
                                }}>
                                <View style={{flexDirection: 'row',margin:10,marginTop:15}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>created_at:-</Text>
                                    <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.created_at}</Text>
                                </View>
                                <View style={{flexDirection: 'row',margin:10}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>url:-</Text>
                                    <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.url}</Text>
                                </View>
                                <View style={{flexDirection: 'row',margin:10,}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>title:-</Text>
                                    <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.title}</Text>
                                </View>
                                <View style={{flexDirection: 'row',margin:10,marginBottom:15}}>
                                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>author:-</Text>
                                    <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.author}</Text>
                                </View>

                            </TouchableOpacity>
                        </View>
                    }

                    </View>
            </View>

        )
    }
}


export default Pagination
