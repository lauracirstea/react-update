import React, { Component } from 'react';
import Layout from '../Layout/Layout';
import { Link } from 'react-router-dom';
import { STORAGE_CATEGORIES } from '../../constants';
import http from '../../libs/http';

export default class Home extends Component {
	constructor(props) {
		super(props);
	}

	// Categories are needed for the products page.
	// Currently, there's no way to communicate between Products and Categories pages. So we use sessionStorage.
	_getCategories = async () => {
		const res = await http.route('categories').get();

		if (!res.isError) {
			const categories = res.data;
			sessionStorage.setItem(STORAGE_CATEGORIES, JSON.stringify(categories));
		} else {
			//TODO error
		}
	};

	async componentDidMount() {
		// Set the categories for sessionStorage. Don't repeat this process if they're already set.
		if (!sessionStorage.getItem(STORAGE_CATEGORIES)) {
			await this._getCategories();
		}
	}

	render() {
		return (
			<Layout>
				<h1>Home page</h1>
			</Layout>
		);
	}
}
