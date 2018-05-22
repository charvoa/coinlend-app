import React from 'react';
import { Buffer } from 'buffer';
import { AsyncStorage } from 'react-native';

class APIClient {
	headers = null
	asyncStorageKey_USERNAME = '@Coinlend:username'
	asyncStorageKey_PASSWORD = '@Coinlend:password'

	static apiClientInstance = null
	static shared() {
		if (APIClient.apiClientInstance == null) {
			APIClient.apiClientInstance = new APIClient()
		}

		return APIClient.apiClientInstance;
	}

	async login(username, password, withSave) {
		this.headers = new Headers()
		this.headers.append('Authorization', 'Basic ' + Buffer.from(username + ':' + password).toString('base64'))
		const response = await fetch('https://coinlend.org/rest?method=user', {headers: this.headers})
		if (response.status == '200') {
			if (withSave === true) {
				const saveStatus = await this.saveLoginDetails(username, password)
				if (saveStatus == 1) {
					return 1
				} else {
					return 0
				}
			} else {
				return 1
			}
		}
		return 0
	}

	async saveLoginDetails(username, password) {
		try {
			await AsyncStorage.setItem(this.asyncStorageKey_USERNAME, username)
			await AsyncStorage.setItem(this.asyncStorageKey_PASSWORD, password)
			return 1
		} catch (error) {
			return 0
		}
	}

	async deleteLoginDetails() {
		try {
			await AsyncStorage.removeItem(this.asyncStorageKey_USERNAME)
			await AsyncStorage.removeItem(this.asyncStorageKey_PASSWORD)
		} catch (error) {}
	}

	async authenticate(username, password) {
		if (username !== null && password !== null) {
			const loginStatus = await this.login(username, password, true)
			return loginStatus
		} else {
			try {
				const username = await AsyncStorage.getItem(this.asyncStorageKey_USERNAME)
				const password = await AsyncStorage.getItem(this.asyncStorageKey_PASSWORD)

				if (username !== null && password !== null) {
					const loginStatus = await this.login(username, password, false)
					return loginStatus
				}
			} catch (error) {
				return 0
			}
		}
	}

	async fetchUser() {
		const response = await fetch('https://coinlend.org/rest?method=user', {headers: this.headers})
		const responseJson = await response.json()
		return responseJson
	}

	async fetchLoans() {
		const response = await fetch('https://coinlend.org/rest?method=loans2', {headers: this.headers})
		const responseJson = await response.json()
		return responseJson
	}
}

module.exports = APIClient;
