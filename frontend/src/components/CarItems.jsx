import React, { useEffect, useState } from 'react'
import CarCard from './CarCard'
import ReactPaginate from 'react-paginate'


const CarItems = ({cars}) => {
    let itemsPerPage=2
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount,setPageCount]=useState(0)
    const [currentItems,setCurrentItems]=useState([]) 

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % cars.length; //2*10%100 =20
        setItemOffset(newOffset);
      };
    useEffect(()=>{
        const endOffset = itemOffset + itemsPerPage; //0+10 =>10
        setCurrentItems(cars.slice(itemOffset,endOffset)) //0,10 => 10 execulde (0 to 9)
        setPageCount(Math.ceil(cars.length / itemsPerPage)) 
    },[itemOffset,cars])

  return (
    <div className='container mt-5'>
        {cars.length==0 &&<h1>No car Found</h1>}
        <div className="row">
            {currentItems.map((c)=><CarCard key={c.id} c={c}/> )}
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
    </div>
  )
}

export default CarItems
