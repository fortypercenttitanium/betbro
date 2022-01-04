import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import selectionList from '../../../../tools/namingLibrary/selectionList';

const SelectionContainer = styled.div`
  display: flex;
  background: transparent;
  height: 52px;
  text-align: center;
`;

const options = selectionList.map((sel, i) => ({
  value: i,
  label: sel.value,
}));

const styles = {
  control: (styles) => ({
    ...styles,
    cursor: 'pointer',
    background: '#2c2837',
    borderColor: 'transparent',
    fontSize: '1rem',
    height: '100%',
    color: '#ddd',
    width: 240,
    textShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
    '@media (max-width: 600px)': {
      fontSize: '0.6rem',
    },
  }),
  container: (styles) => ({
    ...styles,
    padding: 4,
  }),
  option: (styles) => ({
    ...styles,
    color: '#2c2837',
    background: '#ddd',
    cursor: 'pointer',
    ':hover': {
      background: '#ccc',
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'inherit',
  }),
};

function StatSelections({ selections, onChange: handleChange }) {
  return selections.map((sel, i) => {
    return (
      <SelectionContainer key={i}>
        <label htmlFor="data-selector" style={{ display: 'none' }}>
          Select data to display
        </label>
        <Select
          options={options}
          onChange={(e) => {
            handleChange(e.value, i);
          }}
          value={options.find((option) => option.value === sel)}
          isClearable={false}
          isSearchable={false}
          styles={styles}
          menuPlacement={'auto'}
        />
      </SelectionContainer>
    );
  });
}

export default StatSelections;
