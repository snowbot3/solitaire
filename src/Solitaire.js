/**
 *  Dottie's Solitaire
 *  TODO Components come later
**/
import React from 'react'
import Card from './Card'
import Stack from './Stack'
import Deck from './Deck'

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
    tableaux() {
        return this.stacks.slice(0,8);
    }
    foundations() {
        return this.stacks.slice(8);
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
                    return (<Foundation stack={stack} />)
                })}
            </div>
            <div className="Tableaux">
                {this.state.game.tableaux().map(function(stack,stackIndex){
                    return (<div id={"Tableau"+stackIndex}>{stack.size()}</div>)
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
            return (<div className="Foundation">Empty</div>)
        }
        return (<div className="Foundation">{this.props.stack.size()}</div>)
    }
}

// TODO Foundation Stack Component
// TODO Tableau Stack Component

// virtually play?
export default Solitaire

