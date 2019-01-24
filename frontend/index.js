import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import RootComp from './RootComp';

AppRegistry.registerComponent(appName, () => RootComp);
