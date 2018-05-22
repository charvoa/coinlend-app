import React from 'react';

class APIClient {
	email = ''
	password = ''

	constructor(email, password) {
		this.email = email;
		this.password = password;
	}

	authenticate() {
		console.warn('APIClient Authenticate');
	}
}

module.exports = APIClient;
