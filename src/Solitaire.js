/**
 *  Dottie's Solitaire
 *  TODO Components come later
**/
import React from 'react'
import Card from './Card'

class Game {
    constructor() {
        // 0-7 tableaux 8-11 foundations
        this.stacks = [
            new Stack(), new Stack(), new Stack(), new Stack(),
            new Stack(), new Stack(), new Stack(), new Stack(),
            new Stack(), new Stack(), new Stack(), new Stack()
        ];
    }
    deal() {
        var deck = Deck.full()
        deck.shuffle(5)
        var count = [3,4,5,6,7,8,9,10]
        while (count[7] > 0) {
            for (var index=0; index<8; index++) {
                if (count[index]>0) {
                    var card = deck.pullTop()
                    if (count[index] % 2 === 1) {
                        card.shown = true
                    }
                    // unshift vs push?
                    this.stacks[index].pushTop(card)
                    count[index] -= 1
                }
            }
        }
    }
    tryToMoveCard(indFrom, indCard, indTo) {
        if (this.allowMove(indFrom,indCard,indTo)) {
            this.moveCard(indFrom,indCard,indTo)
            return true
        }
        return false
    }
    allowMove(indFrom, indCard, indTo) {
        var stackFrom = this.stacks[indFrom],
            stackTo = this.stacks[indTo],
            card = stackFrom.get(indCard),
            isFoundation = indTo > 7,
            isEmpty = stackTo.size() === 0,
            isLast = (indCard + 1 === stackFrom.size())
        if (!card.shown) {
            return false
        }
        if (indFrom === indTo) {
            return false
        }
        if (isEmpty) {
            if (isFoundation) {
                return isLast && card.face() === 'A'
            }
            return card.face() === 'K'
        }
        var last = stackTo.get(stackTo.size()-1)
        if (isFoundation) {
            return isLast && (last.suitValue === card.suitValue
                && (last.faceValue+1) === card.faceValue)
        }
        return (last.isRed() !== card.isRed()
            && (last.faceValue-1) === card.faceValue)
    }
    moveCard(indFrom, indCard, indTo) {
        var stackFrom = this.stacks[indFrom],
            stackTo = this.stacks[indTo],
            args = stackFrom.splice(indCard)
        args.unshift(stackTo.length, 0)
        stackTo.splice.apply(stackTo, args)
        if (stackFrom.length > 0) {
            stackFrom[stackFrom.length-1].shown = true
        }
    }
}

class Stack {
    constructor() {
        this.cards = []
    }
    pullTop() {
        return this.cards.shift()
    }
    pullBottom() {
        return this.cards.pop()
    }
    pullAll() {
        return this.cards.splice(1)
    }
    push(ind) {
        return this.cards.splice(ind,1)[0]
    }
    size() {
        return this.cards.length
    }
    get(ind) {
        return this.cards[ind]
    }
    pushTop(card) {
        if (card) {
            if (card.length) {
                // if adding the top of stack, start adding from the bottom of the new cards
                for (var ind=card.length-1; ind>-1; ind--) {
                    this.pushTop(card[ind])
                }
            } else {
                if (card instanceof Card) {
                    this.cards.push(card)
                } else {
                    throw new Error('Solitaire:Stack:pushTop: can only push Card to Stack')
                }
            }
        } else {
            throw new Error('Solitaire:Stack:pushTop: must push Card to Stack')
        }
    }
    pushBottom(card) {
        if (card) {
            if (card.length) {
                // if adding the bottom of stack, start adding from the top of the new cards
                for (var ind=0,len=card.length; ind<len; ind++) {
                    this.pushBottom(card[ind])
                }
            } else {
                if (card instanceof Card) {
                    this.cards.unshift(card)
                } else {
                    throw new Error('Solitaire:Stack:pushBottom: can only push Card to Stack')
                }
            }
        } else {
            throw new Error('Solitaire:Stack:pushBottom: must push Card to Stack')
        }
    }
}

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
            {this.state.game.stacks.map(function(stack,stackIndex){
                return (<div id={"SolitaireStack" + stackIndex}>
                    {stack.length/*stack.map(function(card,cardIndex){
                        return (<span className={"SolitaireCard" + cardIndex}>{card.face() + ' ' + card.suit()}</span>)
                    })*/}
                </div>)
            })}
        </div>)
    }
}
Solitaire.Game = Game
Solitaire.Deck = Deck
Solitaire.Card = Card

// virtually play?
export default Solitaire

