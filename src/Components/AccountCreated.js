import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import s from './styles';

export default function() {
	return (
		<div>
			<p>
				Votre compte a bien été créé.
			</p>
			<Link to="/sendMessage">Revenir</Link>
		</div>
	);
}