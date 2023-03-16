import './FilterSelect.scss';
import Select, { CSSObjectWithLabel, SingleValue } from 'react-select';
import { FilterOption } from '../../pages/ProductPage/ProductPage';
import { useSearchParams } from 'react-router-dom';

type Props = {
  options: FilterOption[];
  width: number;
  selectedValue: string;
  sortBy?: boolean
}

const FilterSelect = ({options, width, selectedValue, sortBy}: Props) => {  
  const [params, setParams] = useSearchParams();

  let defaultValue = options.find(item => item.value === selectedValue ? item : null);

  if(!defaultValue){
    defaultValue = sortBy ? {value: 'age', label: 'newest'} : {value: 'all', label: 'all'};
  }

  const onChangeHandle = (e: SingleValue<{value: string, label: string}>) => {
    if(e?.value){
      if(sortBy){
        if(e?.value !== 'age'){
          params.set('sort', e.value);
          setParams(params);    
        }else{
          params.delete('sort');
          setParams(params);
        }
      }else {
        if(e?.value !== 'all'){
          params.set('perPage', e.value);
          setParams(params);    
        }else{
          params.delete('perPage');
          setParams(params);
        }
      }
    }
  };
  
  const colourStyles = {
    control: (styles: CSSObjectWithLabel, {isFocused}: {isFocused: boolean}) => (
      {
        ...styles,
        '&:hover': {
          borderColor: '#89939A'
        },
        borderColor: isFocused ? '#313237' : '#B4BDC4',
        boxShadow: 'none',
        width: width,
      }
    ),
    option: (styles: CSSObjectWithLabel, { isSelected }:{isSelected: boolean}) => (
      {
        ...styles,
        '&:hover': {
          backgroundColor: '#FAFBFC',
          color: '#313237'
        },
        backgroundColor: isSelected ? 'white' : '',
        color: isSelected ? '#89939A' : '',
      }
    ),
  };
  return (
    <Select 
      defaultValue={defaultValue}
      options={options}
      components={{IndicatorSeparator: () => null}}
      styles={colourStyles}
      classNames={{
        control: () =>
          'control',
        option: () =>
          'option'
      }}
      isSearchable={false}
      onChange={onChangeHandle}
    />
  );
};

export default FilterSelect;