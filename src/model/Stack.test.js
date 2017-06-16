import Stack from './Stack'
import Card from './Card'

test('new Stack', ()=>{
	var stack = new Stack()
	expect(stack.cards).toBeDefined()
	expect(stack.cards.length).toEqual(0)
})

test('Stack size', ()=>{
	var stack = new Stack()
	expect(stack.cards.length).toEqual(0)
	expect(stack.size()).toEqual(0)

	stack.cards[0] = new Card(5,1)
	expect(stack.cards.length).toEqual(1)
	expect(stack.size()).toEqual(1)

	stack.cards[1] = new Card(6,2)
	expect(stack.cards.length).toEqual(2)
	expect(stack.size()).toEqual(2)

	stack.cards[2] = new Card(7,3)
	expect(stack.cards.length).toEqual(3)
	expect(stack.size()).toEqual(3)

	stack.cards[3] = new Card(8,4)
	expect(stack.cards.length).toEqual(4)
	expect(stack.size()).toEqual(4)
})

test('Stack get card', ()=>{
	var stack = new Stack()
	var cards = stack.cards = [new Card(5,1), new Card(6,2)]
	expect(stack.size()).toEqual(2)
	expect(stack.get(0)).toEqual(cards[0])
	expect(stack.get(1)).toEqual(cards[1])
})

test('Stack get top card', ()=>{
	var stack = new Stack()
	var cards = stack.cards = [
		new Card(5,1),
		new Card(6,2),
		new Card(7,3),
		new Card(8,4)
	]
	expect(stack.getTop()).toEqual(cards[3])
})

test('Stack push card on top', ()=>{
	var stack = new Stack()
	stack.pushTop(new Card(5,1))
	stack.pushTop(new Card(6,2))
	stack.pushTop(new Card(7,3))
	stack.pushTop(new Card(8,4))
	expect(stack.size()).toEqual(4)
	expect(stack.get(0).faceValue).toEqual(5)
	expect(stack.get(0).suitValue).toEqual(1)
	expect(stack.get(1).faceValue).toEqual(6)
	expect(stack.get(1).suitValue).toEqual(2)
	expect(stack.get(2).faceValue).toEqual(7)
	expect(stack.get(2).suitValue).toEqual(3)
	expect(stack.get(3).faceValue).toEqual(8)
	expect(stack.get(3).suitValue).toEqual(4)
})

test('Stack push card on bottom', ()=>{
	var stack = new Stack()
	stack.pushBottom(new Card(5,1))
	stack.pushBottom(new Card(6,2))
	stack.pushBottom(new Card(7,3))
	stack.pushBottom(new Card(8,4))
	expect(stack.size()).toEqual(4)
	expect(stack.get(0).faceValue).toEqual(8)
	expect(stack.get(0).suitValue).toEqual(4)
	expect(stack.get(1).faceValue).toEqual(7)
	expect(stack.get(1).suitValue).toEqual(3)
	expect(stack.get(2).faceValue).toEqual(6)
	expect(stack.get(2).suitValue).toEqual(2)
	expect(stack.get(3).faceValue).toEqual(5)
	expect(stack.get(3).suitValue).toEqual(1)
})

test('Stack pull card from top', ()=>{
	var stack = new Stack()
	stack.cards = [
		new Card(5,1),
		new Card(6,2),
		new Card(7,3),
		new Card(8,4)
	]
	expect(stack.size()).toEqual(4)

	var card = stack.pullTop()
	expect(stack.size()).toEqual(3)
	expect(card.faceValue).toEqual(5)
	expect(card.suitValue).toEqual(1)

	card = stack.pullTop()
	expect(stack.size()).toEqual(2)
	expect(card.faceValue).toEqual(6)
	expect(card.suitValue).toEqual(2)

	card = stack.pullTop()
	expect(stack.size()).toEqual(1)
	expect(card.faceValue).toEqual(7)
	expect(card.suitValue).toEqual(3)

	card = stack.pullTop()
	expect(stack.size()).toEqual(0)
	expect(card.faceValue).toEqual(8)
	expect(card.suitValue).toEqual(4)

	card = stack.pullTop()
	expect(stack.size()).toEqual(0)
	expect(card).toBeUndefined()
})

test('Stack pull card from bottom', ()=>{
	var stack = new Stack()
	stack.cards = [
		new Card(5,1),
		new Card(6,2),
		new Card(7,3),
		new Card(8,4)
	]
	expect(stack.size()).toEqual(4)

	var card = stack.pullBottom()
	expect(stack.size()).toEqual(3)
	expect(card.faceValue).toEqual(8)
	expect(card.suitValue).toEqual(4)

	card = stack.pullBottom()
	expect(stack.size()).toEqual(2)
	expect(card.faceValue).toEqual(7)
	expect(card.suitValue).toEqual(3)

	card = stack.pullBottom()
	expect(stack.size()).toEqual(1)
	expect(card.faceValue).toEqual(6)
	expect(card.suitValue).toEqual(2)

	card = stack.pullBottom()
	expect(stack.size()).toEqual(0)
	expect(card.faceValue).toEqual(5)
	expect(card.suitValue).toEqual(1)

	card = stack.pullBottom()
	expect(stack.size()).toEqual(0)
	expect(card).toBeUndefined()
})

