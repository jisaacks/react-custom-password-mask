import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import TestUtils from 'react-addons-test-utils';
import serialize from 'form-serialize';

import CustomMaskedPassword from '../dist';

import {expect} from 'chai';


describe('CustomMaskedPassword', () => {

  let inject = (value, mask) => {

    let component = TestUtils.renderIntoDocument(
      <form>
        <CustomMaskedPassword 
          className="pswd" 
          name="pswd" 
          mask={mask} 
          value={value}/>
      </form>
    );

    let node = ReactDOM.findDOMNode(component);

    let hiddenInput = node.querySelector('[name=pswd]');
    let shownInput  = node.querySelector('.pswd');
    let maskedValue = mask.repeat(value.length);

    return {hiddenInput, shownInput, maskedValue, node};
  }
  
  it('masks input with chosen char', () => {
    
    const MASK  = 'X';
    const VALUE = 'secret|message';

    let {hiddenInput, shownInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal(VALUE);
    expect(shownInput.value).to.equal(maskedValue);

  });

  it('can use multibyte chars as mask', () => {
    
    const MASKS = ['💩', '자', '漢', 'か', '☃', '☰', '☯'];
    const VALUE = 'masked with multibyte';

    MASKS.forEach(mask => {
      let {hiddenInput, shownInput, maskedValue} = inject(VALUE, mask);

      expect(hiddenInput.value).to.equal(VALUE);
      expect(shownInput.value).to.equal(maskedValue);
    });

  });

  it('submits the correct value', () => {

    const MASK  = '*';
    const VALUE = 'my password';

    let {node} = inject(VALUE, MASK);

    TestUtils.Simulate.submit(node);

    expect(serialize(node)).to.equal('pswd=my+password');
  });

  it('handles deleting chars correctly', () => {

    const MASK  = '*';
    const VALUE = 'abcdef';

    let {shownInput, hiddenInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal('abcdef');
    expect(shownInput.value ).to.equal('******');

    shownInput.value = 'abcde';
    TestUtils.Simulate.change(shownInput);
    
    expect(hiddenInput.value).to.equal('abcde');
    expect(shownInput.value ).to.equal('*****');

  });

  it('handles adding chars correctly', () => {

    const MASK  = '*';
    const VALUE = 'abcdef';

    let {shownInput, hiddenInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal('abcdef');
    expect(shownInput.value ).to.equal('******');

    shownInput.value = 'abcdefg';
    TestUtils.Simulate.change(shownInput);
    
    expect(hiddenInput.value).to.equal('abcdefg');
    expect(shownInput.value ).to.equal('*******');

  });

  it('handles replacing chars correctly', () => {

    const MASK  = '*';
    const VALUE = 'abcdef';

    let {shownInput, hiddenInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal('abcdef');
    expect(shownInput.value ).to.equal('******');

    shownInput.value = 'aXYZef';
    TestUtils.Simulate.change(shownInput);
    
    expect(hiddenInput.value).to.equal('aXYZef');
    expect(shownInput.value ).to.equal('******');

  });

  it('handles mutlibyte chars as input', () => {

    const MASK  = '*';
    const VALUE = 'abcdef';

    let {shownInput, hiddenInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal('abcdef');
    expect(shownInput.value ).to.equal('******');

    shownInput.value = 'abcdef☰';
    TestUtils.Simulate.change(shownInput);
    
    expect(hiddenInput.value).to.equal('abcdef☰');
    expect(shownInput.value ).to.equal('*******');

  });

  it('handles mutlibyte chars as input with multibyte mask', () => {

    const MASK  = '☃';
    const VALUE = 'abcdef';

    let {shownInput, hiddenInput, maskedValue} = inject(VALUE, MASK);

    expect(hiddenInput.value).to.equal('abcdef');
    expect(shownInput.value ).to.equal('☃☃☃☃☃☃');

    shownInput.value = 'abcdef☰';
    TestUtils.Simulate.change(shownInput);
    
    expect(hiddenInput.value).to.equal('abcdef☰');
    expect(shownInput.value ).to.equal('☃☃☃☃☃☃☃');

  });

});
