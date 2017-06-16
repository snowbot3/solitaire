// Solitaire Card
class Card {
	constructor(face,suit) {
		//if (!Card.faces[face]) { throw new Error('Card:: invalid face value') }
		this.faceValue = face
		this.suitValue = suit
		this.shown = false
		//TODO validate face and suit?
	}
	face() {
		return Card.faces[this.faceValue]
	}
	suit() {
		return Card.suits[this.suitValue]
	}
	isRed() {
		return (this.suitValue === 2 || this.suitValue === 4)
	}
}
Card.suits = ['Joker','Spade','Heart','Club','Diamond']
Card.faces = ['Jk','A','2','3','4','5','6','7','8','9','10','J','Q','K']

export default Card
