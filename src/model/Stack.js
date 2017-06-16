// Solitaire Card Stack
import Card from './Card'

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
    /*push(ind) { // not sure why I had this one...
        return this.cards.splice(ind,1)[0]
    }*/
    size() {
        return this.cards.length
    }
    get(ind) {
        return this.cards[ind]
    }
    getTop() {
        return this.cards[this.cards.length-1]
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
    isEmpty() {
        return this.cards.length === 0
    }
}

export default Stack
