
export function sortData<T>(data: T[], sortKey: keyof T, sortKey2?: keyof T, desc = false) : T[]{
  sortKey === 'alphabatically' ? desc = true : false;
  sortKey === 'fullPrice' ? desc = true : false; // to sort by the most expensive
  
  return data.sort( (a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if(sortKey2){ // sort items with the highest discount, sortKey = price, sortKey2=fullPrice
      const aDiscount = (a[sortKey] as number) - (a[sortKey2] as number);
      const bDiscount = (b[sortKey] as number) - (b[sortKey2] as number);
      return (bDiscount) < (aDiscount) ? 1 : -1;
    } else {
      if(desc){
        return aValue < bValue ? 1 : -1;
      } else {
        return aValue > bValue ? 1 : -1;
      }
    }
  });
}

export function getProductPageData<T>(data: T[], filterKey: keyof T, filterValue: T[keyof T], sortType: keyof T):T[] {  
  let filteredData = data.slice();
  
  filteredData = filteredData.filter((item) => {    
    return item[filterKey] === filterValue;
  });

  return sortData(filteredData, sortType);
}