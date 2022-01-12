import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';


import HomeMain from './component/home/HomeMain';

/**
 * default color
 * 진 그린 : #00B8BA
 * 연 그린 : #31CEAE
 * 핑크 : #E86797
 */
const theme = unstable_createMuiStrictModeTheme();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Switch>
				<Route exact path='/'>
					<HomeMain></HomeMain>
				</Route>
			</Switch>
		</ThemeProvider>
	);
}

export default App;
