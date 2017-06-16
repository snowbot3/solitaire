// Solitaire Deck
import Stack from './Stack'
import Card from './Card'

class Deck extends Stack {
    shuffle(count) {
        while (count>0) {
            shufflePull(this)
            count--
        }
    }
}
Deck.full = function() {
    var deck = new Deck()
    for (var suit=4; suit>0; suit--) {
        for (var face=13; face>0; face--) {
            deck.pushTop(new Card(face,suit))
        }
    }
    return deck
}
function shufflePull(deck) {
    var cards = deck.pullAll(), ind
    for (var len=cards.length; len>0; len--) {
        ind = randomInt(len)
        deck.pushBottom(cards.splice(ind,1)[0])
    }
}
function randomInt(max) {
    return Math.floor(Math.random() * max)
}

export default Deck
