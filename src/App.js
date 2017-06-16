import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Game from './model/Game'

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<div>
						<Solitaire/>
				</div>
			</div>
		)
	}
}

class Solitaire extends React.Component {
	constructor(prop) {
		super(prop)
		var game = new Game()
		game.deal()
		this.state = {
			game: game
		}
	}
	render() {
		return (<div className="Solitaire">
			<div className="Foundations">
				{this.state.game.foundations().map(function(stack,stackIndex){
					return (<Foundation stack={stack} key={stackIndex} />)
				})}
			</div>
			<div className="Tableaux">
				{this.state.game.tableaux().map(function(stack,stackIndex){
					return (<Tableau stack={stack} key={stackIndex} />)
				})}
			</div>
		</div>)
	}
}

class Foundation extends React.Component {
	render() {
		var stack = this.props.stack
		if (!stack) {
			return (<div className="Foundation">BadStack</div>)
		}
		if (stack.isEmpty()) {
			return (<div className="Foundation">
				<div className="GhostCard">A-</div>
			</div>)
		}
		return (<div className="Foundation"><Card is={this.props.stack.getTop()} /></div>)
	}
}

class Tableau extends React.Component {
	render() {
		var stack = this.props.stack
		if (!stack) {
			return (<div className="Tableau">BadStack</div>)
		}
		if (stack.isEmpty()) {
			return (<div className="Tableau">K-</div>)
		}
		return (<div className="Tableau">
			{stack.cards.map(function(card, index){
				return <Card is={card} key={index} />
			})}
		</div>)
	}
}

var htmlSuits = ['','\u2660','\u2665','\u2663','\u2666']
class Card extends React.Component {
	render() {
		var classes = 'Card',
			card = this.props.is,
			content
		if (!card.shown) {
			classes += ' FaceDown'
			content = ''
		} else {
			if (card.isRed()) {
				classes += ' Red'
			}
			content = '' + card.face() + ' ' + htmlSuits[card.suitValue]
		}
		return (<div className={classes}>{content}</div>)
	}
}

// TODO Foundation Stack Component
// TODO Tableau Stack Component

// virtually play?

export default App
