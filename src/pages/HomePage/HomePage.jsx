import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { withOktaAuth } from '@okta/okta-react';

import { userActions } from '../../actions';

class HomePage extends React.Component {
	componentDidMount() {
		this.props.dispatch(userActions.getAll());
	}

	login = () => {
		this.props.authService.login('/home');
	};

	render() {
		// const { user, users } = this.props;
		return <div>Welcome to Advisor</div>;
	}
}

function mapStateToProps(state) {
	const { users, authentication } = state;
	const { user } = authentication;
	return {
		user,
		users,
	};
}

const connectedHomePage = connect(mapStateToProps)(withOktaAuth(HomePage));
export { connectedHomePage as HomePage };
