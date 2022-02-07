import PropTypes from 'prop-types';
import React, { Component } from 'react';

class InputText extends Component {
  render() {
    const {
      value,
      name,
      data,
      getValue,
      type,
    } = this.props;
    return (
      <label htmlFor={ name }>
        { `${name}: ` }
        <input
          name={ name }
          type={ type }
          value={ value }
          data-testid={ data }
          onChange={ getValue }
        />
      </label>
    );
  }
}

export default InputText;

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  getValue: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
