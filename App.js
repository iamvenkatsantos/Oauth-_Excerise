import React, {Component} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import queryString from 'query-string';
import axios from 'axios';
class App extends Component {
  _onNavigationStateChange(webViewState) {
    var URL = queryString.parseUrl(webViewState.url);
    if (URL.query.code) {
      this.setState(
        {
          code: URL.query.code,
        },
        console.log('==================' + this.state.code),
      );
    }

    if (this.state.code) {
      let formdata = new FormData();
      formdata.append('client_id', this.state.client_id);
      formdata.append('code', this.state.code);
      formdata.append('grant_type', this.state.grant_type);
      formdata.append('redirect_uri', this.state.redirect_uri);
      console.log(formdata);

      try {
        axios
          .post('http://192.168.1.192:8080/mobile/api/v1/oauth/token', formdata)
          .then(res => {
            console.log(JSON.stringify(res));
          })
          .catch(err => {
            console.log('-----------' + JSON.stringify(err));
          });
      } catch (errr) {
        console.log('Error: ', errr);
      }
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      client_id: 'solarworld',
      code: '',
      grant_type: 'authorization_code',
      redirect_uri: 'https://getpostman.com/oauth2/callback',
    };
  }
  render() {
    return (
      <WebView
        ref="webview"
        source={{
          uri:
            'http://192.168.1.192:8902/auth/oauth/authorize?response_type=code&client_id=solarworld&redirect_uri=https://getpostman.com/oauth2/callback&state=af0ifjsldkj',
        }}
        onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={false}
      />
    );
  }
}

export default App;
