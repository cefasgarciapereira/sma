import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import Routes from './routes';

const history = createBrowserHistory();

const theme = createTheme({
  palette: {
    primary: {
      main: "#243743",
    },
    secondary: {
      main: "#28b78d",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
