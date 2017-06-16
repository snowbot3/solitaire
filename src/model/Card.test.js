import Card from './Card'

test('Card faceValue', ()=>{
	expect((new Card(0,0)).faceValue).toEqual(0)
	expect((new Card(1,2)).faceValue).toEqual(1)
	expect((new Card(2,1)).faceValue).toEqual(2)
	expect((new Card(10,3)).faceValue).toEqual(10)
	expect((new Card(13,4)).faceValue).toEqual(13)
})

test('Card face', ()=>{
	expect((new Card(0,0)).face()).toEqual('Jk')
	expect((new Card(1,2)).face()).toEqual('A')
	expect((new Card(2,1)).face()).toEqual('2')
	expect((new Card(10,3)).face()).toEqual('10')
	expect((new Card(13,4)).face()).toEqual('K')
})

test('Card suitValue', ()=>{
	expect((new Card(0,0)).suitValue).toEqual(0)
	expect((new Card(1,2)).suitValue).toEqual(2)
	expect((new Card(2,1)).suitValue).toEqual(1)
	expect((new Card(10,3)).suitValue).toEqual(3)
	expect((new Card(13,4)).suitValue).toEqual(4)
})

test('Card face', ()=>{
	expect((new Card(0,0)).suit()).toEqual('Joker')
	expect((new Card(1,2)).suit()).toEqual('Heart')
	expect((new Card(2,1)).suit()).toEqual('Spade')
	expect((new Card(10,3)).suit()).toEqual('Club')
	expect((new Card(13,4)).suit()).toEqual('Diamond')
})

test('Card shown', ()=>{
	var card = new Card(1,1)
	expect(card.shown).toEqual(false)
	card.shown = true
	expect(card.shown).toEqual(true)
	card.shown = false
	expect(card.shown).toEqual(false)
})

test('isRed', ()=>{
	expect((new Card(6,1)).isRed()).toEqual(false)
	expect((new Card(8,2)).isRed()).toEqual(true)
	expect((new Card(10,3)).isRed()).toEqual(false)
	expect((new Card(12,4)).isRed()).toEqual(true)
})

// TODO: Valid cards.
// Nothing greater than 13 for face.
// Nothing greater that 4 for suit.
// face 0 only allowed with suit 0 and vise versa

