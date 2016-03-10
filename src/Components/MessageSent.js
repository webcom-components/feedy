import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import s from './styles';

export default function() {
	return (
		<div>
			<p>
				Votre message a bien été envoyé
			</p>
			<Link to="/sendMessage">Envoyer un autre message</Link>
		</div>
	);
}