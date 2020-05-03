import React, { useEffect } from 'react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import config from '../config';
import { history } from '../helpers';

import logo from '../static/Vector@2x.png';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	logo: {
		width: '3%',
		padding: '1%',
		'&:hover': {
			cursor: 'pointer',
		},
	},
	title: {
		flexGrow: 1,
		fontSize: '2vw',
		color: 'black',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
	btn: {
		margin: theme.spacing(1),
	},
	loginbtn: {
		borderColor: '#18A0FB',
		backgroundColor: '#ffffff',
		color: '#18A0FB',
		'&:hover': {
			backgroundColor: '#18A0FB',
			color: '#ffffff',
		},
	},
	registerbtn: {
		borderColor: '#18A0FB',
		backgroundColor: '#18A0FB',
		color: '#ffffff',
		'&:hover': {
			backgroundColor: '#ffffff',
			color: '#18A0FB',
		},
	},
	btncontainer: {
		position: 'relative',
		right: 0,
		width: '15%',
	},
}));

const Login = () => {
	useEffect(() => {
		const { pkce, issuer, clientId, redirectUri, scopes } = config.oidc;
		const widget = new OktaSignIn({
			/**
			 * Note: when using the Sign-In Widget for an OIDC flow, it still
			 * needs to be configured with the base URL for your Okta Org. Here
			 * we derive it from the given issuer for convenience.
			 */
			baseUrl: issuer.split('/oauth2')[0],
			clientId,
			redirectUri,
			logo: logo,
			i18n: {
				en: {
					'primaryauth.title': 'Sign in to Advisor',
				},
			},
			authParams: {
				pkce,
				issuer,
				display: 'page',
				responseMode: pkce ? 'query' : 'fragment',
				scopes,
			},
			colors: {
				brand: '#18A0FB',
			},
			idps: [
				{ type: 'GOOGLE', id: '0oaam8g61uCkDm5lF4x6' },
				// { type: 'FACEBOOK', id: '0oar25ZnMM5LrpY1O0g3' },
				// { type: 'LINKEDIN', id: '0oaaix1twko0jyKik0g4' },
			],
			registration: {
				click: function () {
					// window.location.href = 'https://acme.com/sign-up';
					history.push('/register');

				},
			},
			features: {
				// Used to enable registration feature on the widget.
				// https://github.com/okta/okta-signin-widget#feature-flags
				registration: true, // REQUIRED
			},
		});

		widget.renderEl(
			{ el: '#sign-in-widget' },
			() => {
				/**
				 * In this flow, the success handler will not be called beacuse we redirect
				 * to the Okta org for the authentication workflow.
				 */
			},
			(err) => {
				throw err;
			}
		);
	}, []);

	const classes = useStyles();

	const onClickLogo = () => {
		history.push('/');
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="transparent">
				<Toolbar>
					<img
						className={classes.logo}
						src={logo}
						alt="Logo"
						onClick={onClickLogo}
					/>
					<Typography variant="h6" className={classes.title}>
						ADVISOR
					</Typography>
					<div className={classes.btncontainer}>
						<Button
							className={`${classes.btn} ${classes.loginbtn}`}
							variant="contained"
							color="primary">
							Login
						</Button>
						<Button
							className={`${classes.btn} ${classes.registerbtn}`}
							variant="contained"
							color="primary">
							Register
						</Button>
					</div>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item xs={12}>
					<div id="sign-in-widget" />
				</Grid>
			</Grid>
		</div>
	);
};
export default Login;
