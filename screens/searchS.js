import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import db from '../config';

export default class SearchScreen extends React.Component {

  constructor(props){
    super(props);
      this.state={
        allTransactions:[],
        lastVisibleTransaction:null
      }
  }

  componentDidMount = async() => {
    const query = await db.collection("transaction").get();
    query.docs.map((doc) => {
      this.setState({allTransactions:[...this.state.allTransactions.doc.data()]});
    })
  }

  fetchMoreTransactions = async() =>{
    
    var text = this.state.search.toUpperCase();
    var enteredText = text.split("");

    if(enteredText[0].toUpperCase() === 'B'){

      const query = await db.collection("transaction").where(
        'bookID',
        '==',
        text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
        query.docs.map((doc) => {
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
          });
        });
    } else if(enteredText[0].toUpperCase() === 'S'){

      const query = await db.collection("transaction").where(
        'bookID',
        '==',
        text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
        query.docs.map((doc) => {
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
          });
        });
    }
  }

  searchTransactions = async(text) =>{
    
    var enteredText = text.split("");

    if(enteredText[0].toUpperCase() === 'B'){

      const transaction = await db.collection("transaction").where(
        'bookID',
        '==',
        text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
        transaction.docs.map((doc) => {
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
          });
        });
    } else if(enteredText[0].toUpperCase() === 'S'){

      const query = await db.collection("transaction").where(
        'bookID',
        '==',
        text).startAfter(this.state.lastVisibleTransaction).limit(10).get();
        query.doc.map((doc) => {
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction:doc
          });
        });
    }
  }


    render(){

      <View style={styles.container}> 
        <View style={styles.searchBar}> 
          <TextInput style ={styles.bar} placeholder = "Enter Book Id or Student Id" onChangeText={(text)=>{this.setState({search:text})}}/> 
          <TouchableOpacity 
            style = {styles.searchButton} 
            onPress={()=>{
              this.searchTransactions(this.state.search)}
            }> 
            <Text>Search</Text> 
          </TouchableOpacity> 
        </View>

      <FlatList 
        data={this.state.allTransactions}
        renderItem={(item) => {
          <View style={{borderBottomWidth:2}}>
            <Text>{"BookID: " + transaction.bookID}</Text>
            <Text>{"StudentID: " + transaction.studentID}</Text>
            <Text>{"TransactionType: " + transaction.transactionType}</Text>
            <Text>{"Date: " + transaction.date.toDate()}</Text>
          </View>
        }}
        keyExtractor={(item,index)=>index.toString()}
        onEndReached={this.fetchMoreTransactions()}
        onEndReachedThreshold={0.7}
      />

      </View>

    }
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    marginTop: 20 
  }, 

  searchBar:{ 
    flexDirection:'row', 
    height:40, 
    width:'auto', 
    borderWidth:0.5, 
    alignItems:'center', 
    backgroundColor:'grey', 
  }, 
  
  bar:{ 
    borderWidth:2, 
    height:30, 
    width:300, 
    paddingLeft:10, 
  }, 
  
  searchButton:{ 
    borderWidth:1, 
    height:30, 
    width:50, 
    alignItems:'center', 
    justifyContent:'center', 
    backgroundColor:'green' 
  } 

})