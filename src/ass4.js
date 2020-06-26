import React,{Component} from 'react';
import {View,Text,TextInput,
    TouchableOpacity,Image,FlatList} from 'react-native';
import {Column as Col, Row} from 'react-native-flexbox-grid'


class Ass4 extends Component {
    constructor() {
        super();
        this.state = {
            countries: 'Uk',
            show:false,
            type:'',

        }
    }

    componentDidMount(){
        fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=dc45002677a54c89a8a182306f8af069")
            .then(response => response.json())
            .then((responseJson)=> {
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
                console.log("responseJson",JSON.stringify(responseJson.articles))

            })

            .catch(error=>console.log(error)) //to catch the errors if any
    }

    renderItem(route){
        console.log("renderItem",JSON.stringify(route))
        const data=route.item
        const created_at=data.publishedAt,title=data.title,content=data.content,url=data.urlToImage
             console.log("all data",JSON.stringify(data.source))
        return(
            <View style={{alignItems:'center',}}>
                <TouchableOpacity
                    style={{marginTop:10,margin:20,borderWidth:0.5,width:'100%',
                        height:'auto',
                    }}>
                    <Row size={12} >
                        <Col sm={3} md={3} lg={3} style={{alignItems:'center',marginTop:20,marginBottom:10}}>
                            <Image style={{width:55,height:70}}
                            source={{uri: url}}/>
                        </Col>
                        <Col sm={6} md={6} lg={6} style={{alignItems:'center',marginTop:10,}}>
                    <View style={{}}>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>{title}</Text>
                        <Text style={{fontSize: 12,number:2, color:'#9a8989',marginBottom:10}}>{content}</Text>
                    </View>

                        </Col>
                    <Col sm={3} md={3} lg={3} style={{alignItems:'center',marginTop:20,}}>

                    <View style={{flexDirection: 'row',marginLeft:10,marginRight:10,marginBottom:15}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold',color:'#4cbaba'}}>View</Text>

                    </View>
                    </Col>
                    </Row>

                </TouchableOpacity>
            </View>
        )
    }
    render() {
        return (
            <View>
                <Row size={12} style={{width:'100%',height:50,backgroundColor:'#6d42a7',}}>
                    <Col sm={4} md={4} lg={4} style={{alignItems:'center',marginTop:10,}}>
            <TouchableOpacity onPress={()=>
            this.setState({type:'science'})}>
                            <Text style={{fontWeight:'bold',color:'#fff',fontSize:20,
                            }}>
                                Science
                            </Text>
                </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={4} style={{alignItems:'center',marginTop:10}}>
                        <TouchableOpacity onPress={()=>
                            this.setState({type:'business'})}>
                        <Text style={{fontWeight:'bold',color:'#fff',fontSize:20}}>
                            Business
                        </Text>
                        </TouchableOpacity>
                    </Col>
                    <Col sm={4} md={4} lg={4} style={{alignItems:'center',marginTop:10}}>
                        <TouchableOpacity onPress={()=>
                            this.setState({type:'sport'})}>
                        <Text style={{fontWeight:'bold',color:'#fff',fontSize:20}}>
                            Sports
                        </Text>
                        </TouchableOpacity>
                    </Col>
                </Row>
                    <View style={{marginTop:60}}>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={item => this.renderItem(item)}
                            keyExtractor={item => item.id}

                        />
                    </View>

            </View>
        )
    }
}
export default Ass4;
