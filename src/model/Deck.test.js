import Deck from './Deck'
import Card from './Card'
import Stack from './Stack'

test('new Deck', ()=>{
    var deck = new Deck()
    expect(deck.cards).toBeDefined()
    expect(deck.cards.length).toEqual(0)
    expect(deck instanceof Deck).toEqual(true)
    expect(deck instanceof Stack).toEqual(true)
})

// TODO test shuffle some how?
