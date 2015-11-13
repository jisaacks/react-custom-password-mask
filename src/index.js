import React from 'react';
import punycode from 'punycode';

export default class CustomMaskedPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};
  }

  get value() {
    return this.state.value;
  }

  get mask() {
    let {mask="•"} = this.props;
    return this.encode([this.decode(mask)[0]]);
  }

  get maskedValue() {
    return this.mask.repeat(this.decode().length);
  }

  encode(str=this.value) {
    return punycode.ucs2.encode(str);
  }

  decode(str=this.value) {
    return punycode.ucs2.decode(str);
  }

  changeHandler(e) {
    let oldChars = this.decode();
    let newChars = this.decode(e.target.value);
    let maskCode = this.decode(this.mask)[0];
    let newValue = this.encode(newChars.map((c,i) => (
      c === maskCode ? (oldChars[i] || c) : c
    )));

    this.setState({value: newValue});
  }

  render() {
    return (
      <span>
        <input 
          type="text" 
          className={this.props.className}
          id={this.props.id}
          value={this.maskedValue} 
          onChange={::this.changeHandler}/>
        <input
          type="hidden"
          value={this.value}
          name={this.props.name}/>
      </span>
    );
  }
}
