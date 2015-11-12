# React Custom Password Mask

Use a custome mask (a char other then the default bullet) for a password field.

### Install

```shell
npm install react-custom-password-mask --save
```

### Usage

```javascript
import React from 'react';
import MaskInput from 'react-custom-password-mask';

export default React.createClass({

  render() {
    return (
      <form>
        <MaskInput ref="pswd" mask="X" name="password/>
        <button onClick={() => console.log(this.refs.pswd.value)}>
          Submit
        </button>
      </form>
    );
  }

});
```

You can also use multibyte chars:

```javascript
<MaskInput mask="💩"/>
```
