import { Phone } from './types/Phone';

function sortData(data: Phone[], params: string){
  return data.sort( (a: Phone, b: Phone) => {
    if(params === 'fullPrice'){
      return a.price < b.price ? 1 : -1;
    }else {
      return (a.fullPrice - a.price) < (b.fullPrice - b.price) ? 1 : -1;
    }
  });
}

export function filterData(data: Phone[], params: string){
  let filteredData = data.slice();
  filteredData = filteredData.filter((item) => {

    if(params === 'fullPrice'){
      return item.fullPrice === item.price; 
    } else {
      return item.fullPrice !== item.price;
    }
  });

  return sortData(filteredData, params);
}
