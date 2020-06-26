import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {Column as Col, Row} from "react-native-flexbox-grid";
import React,{Component} from 'react';


class New extends Component {
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
                console.log("responseJson",JSON.stringify(responseJson))

            })

            .catch(error=>console.log(error)) //to catch the errors if any
    }

    renderItem(route) {
        console.log("renderItem", JSON.stringify(route.articles.length))
        const data = route.item
        const created_at = data.publishedAt, title = data.title, content = data.content, url = data.urlToImage
        console.log("all data", JSON.stringify(data.source))
    }
render() {
        console.log("")
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
export default New;
