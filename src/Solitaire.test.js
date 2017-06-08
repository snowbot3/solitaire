import React from 'react';
import ReactDOM from 'react-dom';
import Solitaire,{Card,Stack,Deck} from './Solitaire';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Solitaire />, div)
});

test('concept', ()=>{
    expect(typeof Solitaire.Card).toBe('function')
})
