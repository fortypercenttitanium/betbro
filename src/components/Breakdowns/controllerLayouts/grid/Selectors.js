import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const SelectionContainer = styled.div`
  display: flex;
  background: transparent;
  height: 52px;
  text-align: center;
  border: 1px solid white;
  border-radius: 5px;
`;

function findOption(optionsArr, selection) {
  const result = optionsArr.find(
    (opt) =>
      opt.label === selection.category &&
      opt.options.find((sel) => sel.value === selection.name),
  );

  return result.options.find((sel) => sel.value === selection.name);
}

const groupStyles = {
  Odds: {
    normal: 'rgb(180, 200, 240)',
    hover: 'rgb(190, 210, 250)',
  },
  Games: {
    normal: 'rgb(160, 220, 220)',
    hover: 'rgb(180, 230, 230)',
  },
  Record: {
    normal: 'rgb(200, 160, 210)',
    hover: 'rgb(220, 180, 230)',
  },
  Differentials: {
    normal: 'rgb(230, 230, 210)',
    hover: 'rgb(240, 240, 220)',
  },
  Offense: {
    normal: 'rgb(200, 220, 200)',
    hover: 'rgb(210, 230, 210)',
  },
  Defense: {
    normal: 'rgb(245, 225, 225)',
    hover: 'rgb(255, 235, 235)',
  },
};

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
    '@media (max-width: 768px)': {
      fontSize: '0.8rem',
      width: 150,
    },
  }),
  container: (styles) => ({
    ...styles,
    padding: 4,
  }),
  option: (styles, { selectProps, data }) => {
    // Background styles based on group
    const group = selectProps.options.find((option) =>
      option.options.includes(data),
    ).label;

    const { normal, hover } = groupStyles[group];

    return {
      ...styles,
      color: '#2c2837',
      background: normal,
      cursor: 'pointer',
      ':hover': {
        backgroundColor: hover,
      },
    };
  },
  singleValue: (styles) => ({
    ...styles,
    color: 'inherit',
  }),
  group: (styles, { data }) => {
    // Background style based on group
    const group = data.label;
    const { normal } = groupStyles[group];

    return {
      ...styles,
      backgroundColor: normal,
      color: '#ddd',
    };
  },
  groupHeading: (styles) => ({
    ...styles,
    color: '#333',
    fontWeight: 'bold',
    fontSize: '1rem',
    textShadow: '1px 1px 1px #999',
  }),
  menu: (styles) => ({
    ...styles,
    minWidth: '200px',
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
};

function Selectors({ selectionList, selections, onChange: handleChange }) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const optionsSet = selectionList.reduce(
      (acc, sel) => {
        const categoryExists = acc.find(
          (option) => option.label === sel.category,
        );
        if (categoryExists) {
          categoryExists.options.push({
            value: sel.name,
            label: sel.value,
            category: sel.category,
          });
        } else {
          acc.push({
            label: sel.category,
            options: [
              { value: sel.name, label: sel.value, category: sel.category },
            ],
          });
        }

        return acc;
      },
      [
        {
          label: 'Odds',
          options: [],
        },
        {
          label: 'Games',
          options: [],
        },
        {
          label: 'Record',
          options: [],
        },
        {
          label: 'Differentials',
          options: [],
        },
        {
          label: 'Offense',
          options: [],
        },
        {
          label: 'Defense',
          options: [],
        },
      ],
    );

    setOptions(optionsSet);
  }, [selectionList]);

  return selections.map((sel, i) => {
    return (
      <SelectionContainer key={i}>
        <label htmlFor="data-selector" style={{ display: 'none' }}>
          Select data to display
        </label>
        {options.length && (
          <Select
            options={options}
            onChange={({ category, value }) => {
              handleChange({ category, name: value }, i);
            }}
            value={findOption(options, sel)}
            isClearable={false}
            isSearchable={false}
            styles={styles}
            menuPlacement={'auto'}
          />
        )}
      </SelectionContainer>
    );
  });
}

export default Selectors;
