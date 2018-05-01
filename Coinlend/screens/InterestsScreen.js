import React, { Component } from 'react';
import { Image, View, Text, SectionList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';

class InterestsListItem extends React.PureComponent {

  imageSize = 25;
  cellHeight = 50;

  render() {
    return (
      <View
        style={{flex: 1,
          height: this.cellHeight,
          flexDirection: 'row',
          backgroundColor: '#171F27',
          justifyContent: 'flex-start',
          alignItems: 'center'}}>
          <View style={{flex: 1, height: this.cellHeight, flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
            <Image
              style={{width: this.imageSize, height: this.imageSize, borderRadius: this.imageSize/2}}
              source={{uri: this.props.item.icon_url}}
            />
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight, marginLeft: 10}}>
              {this.props.item.name}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'center', lineHeight: this.cellHeight}}>
              {this.props.item.balance}
            </Text>
          </View>
          <View style={{flex: 1, height: this.cellHeight}}>
            <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', lineHeight: this.cellHeight, marginRight: 10}}>
              {this.props.item.interest}
            </Text>
          </View>
        </View>
      );
    }
  }

  class InterestsHeaderItem extends React.Component {
    render() {
      return (
        <View backgroundColor='#151F29'>
        <Grid style={{height: 214}}>
          <Row style={{flex:1, flexDirection:'column'}} alignItems='center' justifyContent='center'>
            <Text style={{fontSize: 40, color:'#A1C363'}}>
              $597,803.62
            </Text>
            <Text style={{fontSize: 10, color: 'white'}}>
              Total lending balance
            </Text>
          </Row>
          <Row>
            <Col alignItems='center' justifyContent='center'>
              <Text style={{fontSize: 25, color:'#A1C363'}}>
                $2,583.98
              </Text>
              <Text style={{fontSize: 10, color: 'white'}}>
                Total Interest (30d)
              </Text>
            </Col>
            <Col alignItems='center' justifyContent='center'>
              <Text style={{fontSize: 25, color:'#A1C363'}}>
                $8,904.44
              </Text>
              <Text style={{fontSize: 10, color: 'white'}}>
                Expected Interest (next 30d)
              </Text>
            </Col>
          </Row>
        </Grid>
        <View
          style={{flex: 1,
            height: 40,
            flexDirection: 'row',
            backgroundColor: '#27292A',
            justifyContent: 'center',
            alignItems: 'center'}}>
            <View style={{flex: 1, height: this.cellHeight}}>
              <Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
                Token
              </Text>
            </View>
            <View style={{flex: 1, height: this.cellHeight}}>
              <Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
                Balance
              </Text>
            </View>
            <View style={{flex: 1, height: this.cellHeight}}>
              <Text style={{ color: 'white', textAlign: 'center', lineHeight: 40}}>
                Interest
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }

  class InterestsFlatList extends React.Component {

    _keyExtractor = (item, index) => item.id;

    _renderSeparator = () => {
      return (
        <View
          style={{ height: 1, width: '86%', backgroundColor: 'black', marginLeft: '14%' }}
        />
      );
    }

    _renderHeader = () => {
      return (<InterestsHeaderItem />);
    }

    _renderItem = ({ item }) => (
      <InterestsListItem item={item} containerStyle={{ borderBottomWidth: 0 }}/>
    );

    _renderSectionHeader = ({ section }) => {
      return (
        <View backgroundColor='#27292A' flex alignItems='center' justifyContent='center' height={40}>
          <Text alignSelf='center'style={{fontSize:20, color:'white'}}>{section.title}</Text>
        </View>
      );
    }

    constructor(props) {
      super(props);

      this.state = {
        data: []
      }
    }

    makeRequest() {
      list = []
      for (let i = 0; i < 10; i++) {
        list.push({
          name: 'BTC',
          icon_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/600px-Bitcoin.svg.png',
          balance: '75.02384' ,
          interest: '0.37382',
          id: i.toString()
        });
      }

      this.setState({
        data: list
      })
    }

    componentDidMount() {
      this.makeRequest()
    }

    render() {
      return (
        <List containerStyle={{ borderBottomWidth: 0, borderTopWidth: 0}} >
          <SectionList
            style={{backgroundColor: '#171F27'}}
            sections={[
              { title: 'Bitfinex', data: this.state.data },
              { title: 'Poloniex', data: this.state.data },
              { title: 'Quoine', data: this.state.data }]}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              renderSectionHeader={this._renderSectionHeader}
              ListHeaderComponent={this._renderHeader}
              ItemSeparatorComponent={this._renderSeparator}
            />
          </List>
        );
      }
    }


    class InterestsScreen extends React.Component {
      render() {
        return (
          <View>
            <InterestsFlatList />
          </View>
        );
      }
    }

    module.exports = InterestsScreen;
