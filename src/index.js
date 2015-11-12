import React from 'react';
import punycode from 'punycode';

export default class PasswordField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};
  }

  get value() {
    return this.state.value;
  }

  getMask() {
    let {mask="•"} = this.props;
    return mask.repeat(this.decode().length);
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
    let newValue;
    if (oldChars.length < newChars.length) {
      let addedChars = newChars.slice(oldChars.length);
      newValue = [].concat(oldChars, addedChars);
    } else {
      newValue = oldChars.slice(0, newChars.length);
    }
    this.setState({value: this.encode(newValue)});
  }

  render() {
    return (
      <span>
        <input 
          type="text" 
          className={this.props.className}
          id={this.props.id}
          value={this.getMask()} 
          onChange={::this.changeHandler}/>
        <input
          type="hidden"
          value={this.value}
          name={this.props.name}/>
      </span>
    );
  }
}
