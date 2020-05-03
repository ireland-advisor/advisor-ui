
const CALLBACK_PATH = '/implicit/callback';
const OKTA_DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
// const SCOPES = 'openid profile email';


const OKTA_TESTING_DISABLEHTTPSCHECK =
	process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;

export default {
	oidc: {
		clientId: CLIENT_ID,
		issuer: ISSUER,
		redirectUri: REDIRECT_URI,
		scopes: ['openid', 'profile', 'email'],
		pkce: true,
		disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
	},

};
