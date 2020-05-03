import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './pages/HomePage';
import Login from './components/Login';
import Register from './components/Register';


import config from './config';

const CALLBACK_PATH = '/implicit/callback';

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	customAuthHandler = () => {
    // Redirect to the /login page that has a CustomLoginComponent
	// history.push('/login');
	window.location.href = '/login';
  };

	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						<Router history={history}>
							<Security {...config.oidc} onAuthRequired={this.customAuthHandler}>
								<div>
									<Route path={CALLBACK_PATH} component={LoginCallback} />
									<Route path="/login" component={Login} />
									<Route path="/register" component={Register} />
									<SecureRoute exact path="/" component={HomePage} />
								</div>
							</Security>
						</Router>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { alert } = state;
	return {
		alert,
	};
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
