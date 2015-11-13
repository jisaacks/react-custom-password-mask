# React Custom Password Mask

The idea is to make it a drop in replacement for `<input type="password"/>` while being able to use any masking char (instead of the default bullet.)

### Install

```shell
npm install react-custom-password-mask --save
```

### Usage

```javascript
import React from 'react';
import serialize from 'form-serialize';
import CustomMaskedPassword from 'react-custom-password-mask';

export default React.createClass({

  submitHandler(event) {
    event.preventDefault();

    // Using ref: secret
    console.log("Using ref:", this.refs.pswd.value);

    // From form: password=secret
    console.log("From form:", serialize(this.refs.form));
  },

  render() {
    return (
      <form ref="form" onSubmit={this.submitHandler}>
        <CustomMaskedPassword ref="pswd" name="password" mask="X"/>
        <button>Submit</button>
      </form>
    );
  }

}); 

```

You can also use multibyte chars:

```javascript
<MaskInput mask="💩"/>
```
