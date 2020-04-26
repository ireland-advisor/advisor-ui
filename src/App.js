import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';

import { history } from './helpers';
import { alertActions } from './actions';
import { HomePage } from './pages/HomePage';

const CALLBACK_PATH = '/implicit/callback';
const OKTA_DOMAIN =  process.env.DOMAIN;
const CLIENT_ID =  process.env.CLIENT_ID;

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';

const config = {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
};

class App extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = this.props;
		history.listen((location, action) => {
			// clear alert on location change
			dispatch(alertActions.clear());
		});
	}

	render() {
		return (
			<div className="jumbotron">
				<div className="container">
					<div className="col-sm-8 col-sm-offset-2">
						<Router history={history}>
							<Security {...config}>
								<div>
									<Route path={CALLBACK_PATH} component={LoginCallback} />
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
