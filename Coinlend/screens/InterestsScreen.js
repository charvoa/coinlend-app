import React, { Component } from 'react';
import { Image, View, Text, SectionList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Buffer } from 'buffer';
import APIClient from '../network/APIClient';
import { FormattedProvider } from 'react-native-globalize';
import { FormattedCurrency } from 'react-native-globalize';
import Icon from 'react-native-vector-icons/Entypo';
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
              <View backgroundColor='#27292A' flex={1} alignItems='center' justifyContent='center' height={40}>
                <Text alignSelf='center'style={{fontSize:20, color:'white'}}>{section.title}</Text>
              </View>
            );
          }

          constructor(props) {
            super(props);

            this.state = {
              data: [],
              headerData: {totalBalanceUSD: '0', interestTotal: '0', interest30dUSD: '0'},
              isLoading: true
            }
          }

          async fetchUser() {
            const responseJson = await APIClient.shared().fetchUser()
            this.setState(
              {
                headerData: {
                  totalBalanceUSD: responseJson['totalBalanceUSD'],
                  interestTotal: responseJson['interestTotal'],
                  interest30dUSD: responseJson['interest30dUSD']
                }
              })
            }

            // DEBUG PURPOSE ONLY
            async fetchLoans() {
              const responseJson = await APIClient.shared().fetchLoans()
              dataJson = Object.keys(responseJson).map((key) => {
                return { data: responseJson[key], title: key }
              });
              this.setState({
                data: dataJson,
              })
            }

            async makeRequest() {
              await this.fetchUser()
              await this.fetchLoans()
              this.setState({
                isLoading: false
              })

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
                    <SectionList
                      style={{backgroundColor: '#171F27'}}
                      sections={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        renderSectionHeader={this._renderSectionHeader}
                        ListHeaderComponent={this._renderHeader}
                        ItemSeparatorComponent={this._renderSeparator}
                      />
                  </SafeAreaView>
                );
              }
            }


            class InterestsScreen extends React.Component {
              render() {
                return (
                  <FormattedProvider locale="en">
                  <InterestsFlatList />
                </FormattedProvider>

                );
              }
            }

            module.exports = InterestsScreen;
