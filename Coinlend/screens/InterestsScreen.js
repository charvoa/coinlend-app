import React, { Component } from 'react';
import { Image, View, Text, SectionList, SafeAreaView, ActivityIndicator } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Buffer } from 'buffer';
import { FormattedCurrency } from 'react-native-globalize';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Module SafeAreaManager', 'Module RCTImageLoader']);

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
      return (
        <View backgroundColor='#151F29'>
          <Grid style={{height: 214}}>
            <Row style={{flex:1, flexDirection:'column'}} alignItems='center' justifyContent='center'>
              <FormattedCurrency
                value={parseInt(this.state.headerData.totalBalanceUSD)}
                currency="USD"
                style={{fontSize: 28, color:'#A1C363'}} />
              <Text style={{fontSize: 10, color: 'white'}}>
                Total lending balance
              </Text>
            </Row>
            <Row>
              <Col alignItems='center' justifyContent='center'>
                <FormattedCurrency
                  value={parseInt(this.state.headerData.interestTotal)}
                  currency="USD"
                  style={{fontSize: 28, color:'#A1C363'}}
                />
                <Text style={{fontSize: 10, color: 'white'}}>
                  Total Interest (30d)
                </Text>
              </Col>
              <Col alignItems='center' justifyContent='center'>
                <FormattedCurrency
                  value={parseInt(this.state.headerData.interest30dUSD)}
                  currency="USD"
                  style={{fontSize: 28, color:'#A1C363'}} />
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
          data: [],
          headerData: {totalBalanceUSD: '', interestTotal: '', interest30dUSD: ''},
          isLoading: true
        }
      }

      fetchUser() {
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + Buffer.from('demo@coinlend.org:Demo2018').toString('base64'));
        fetch('https://coinlend.org/rest?method=user', {headers: headers})
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            headerData: {totalBalanceUSD: responseJson['totalBalanceUSD'], interestTotal: responseJson['interestTotal'], interest30dUSD: responseJson['interest30dUSD'] },
            isLoading: false
          })
        })
        .catch((error) => {
          console.error(error);
        });
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

        this.fetchUser()
      }

      componentDidMount() {
        this.makeRequest()
      }

      render() {
        if (this.state.isLoading) {
          return (
            <SafeAreaView backgroundColor='#27292A' style={{flex: 1, height: '100%', justifyContent: 'center', alignItems:'center'}}>
              <ActivityIndicator size="large" color="#000000" />
            </SafeAreaView>
          );
        }
        return (
          <SafeAreaView backgroundColor='#27292A'>
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
          </SafeAreaView>
          );
        }
      }


      class InterestsScreen extends React.Component {
        render() {
          return (
              <InterestsFlatList />
          );
        }
      }

      module.exports = InterestsScreen;
