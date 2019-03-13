import React, {Component} from 'react';
import { picFound } from './actions/picActions.js';
import { navAction } from './actions/navigationAction.js';
import { connect } from 'react-redux';
import MainNavigation from './mainNavigation.js';
console.disableYellowBox = true;


type Props = {};
class App extends Component<Props> {

  state = {
    active: 'first'
  };
  constructor() {
    super();
  };

  render() {
    return (
    <MainNavigation/>
    );

  }
}
const mapStateToProps = state => ({
  url: state.pics.picURL,
  tag: state.tags.activeTag
});

export default connect(mapStateToProps, { picFound, navAction })(App);
