import {useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Arrow, ArrowBlack } from '../../assets/icons';
import './Paginator.scss';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
  currentPage: number
  itemsPerPage: string;
  totalItems: number;
}

const Paginator = ({ onPageChange, currentPage, itemsPerPage, totalItems} : Props) => {
  const [params, setParams] = useSearchParams();
  const [numberOfPages, setNumberOfPages] = useState([1]);
  const [transform, setTransform] = useState((currentPage - 4) * 40);

  const onUpdatePage = (page : number) => {
    const steps = Math.abs(currentPage - page);
    const distance = steps * 40;
    
    if(page < currentPage){
      transform - distance <= 0 ? setTransform(0) : setTransform(transform - distance);
    }else if(page > currentPage && page >= 5){  
      setTransform(transform + distance);
    }
    onPageChange(page);
  };

  useEffect(() => {
    if(itemsPerPage === 'all' || Number(itemsPerPage) === totalItems){
      params.delete('page');
      setParams(params, {replace: true});
      setNumberOfPages([1]);
      setTransform(0);
    }else {
      const _pagesCount = Math.ceil(totalItems / Number(itemsPerPage));
      const element: number[] = [];
      for (let i = 1; i <= _pagesCount; i++) {
        element.push(i);
      }
      setNumberOfPages(element);
      if(currentPage > _pagesCount){
        setTransform((_pagesCount - 4) * 40);
        params.set('page', _pagesCount.toString());
        setParams(params, {replace: true});
      }
    }    
  }, [itemsPerPage]);

  return (
    <div className="paginator" 
      style={{width: numberOfPages.length < 4 ? `${((numberOfPages.length * 40) - 8) + 96}px` : '248px'}}
    >
      <button 
        type="button" 
        className="paginator-prevPage paginator-controller"
        onClick={() => onUpdatePage(currentPage-1)}
        disabled={currentPage === 1}
      >
        <img src={currentPage === 1 ? Arrow : ArrowBlack} alt="previous page button" className="leftArrow"/>
      </button>

      <div
        className="paginator-pageNumbersBox"
        style={{width: numberOfPages.length < 4 ? `${(numberOfPages.length * 40) - 8}px` : '152px'}}
      >
        {numberOfPages.map(item => (
          <button 
            key={item} 
            type="button" 
            className={`paginator-pageNumbersBox-pageNumber ${item === currentPage ? 'paginator-pageNumbersBox-pageNumber--active' : ''}`}
            onClick={() => onUpdatePage(item)}
            style={{transform: `translateX(-${transform}px)`}}
          >
            {item}
          </button>
        ))
        }
      </div>

      <button
        type="button" 
        className="paginator-nextPage paginator-controller"
        onClick={() => onUpdatePage(currentPage+1)}
        disabled={currentPage === numberOfPages.length}
      >
        <img src={currentPage === numberOfPages.length ? Arrow : ArrowBlack} alt="next page button" className="rightArrow"/>
      </button>
    </div>
  );
};

export default Paginator;
