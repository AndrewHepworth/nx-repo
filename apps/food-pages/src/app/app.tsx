// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState } from 'react';
import styles from './app.module.css';

import NxWelcome from './nx-welcome';

const dataSet = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function FilterableProductTable ({ data }: any) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return ( 
    <>
      <div>
        <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onStockOnlyChange={setInStockOnly} />
        <div> </div>
        <ProductTable data={data} filterText={filterText} inStockOnly={inStockOnly}/>
      </div>
    </>
  )

}


function SearchBar ({ filterText, inStockOnly, onFilterTextChange, onStockOnlyChange}) {
  const toggled = inStockOnly ? 'on' : 'off'
  const text = filterText === '' ? 'Search...' : filterText

  return (
    <>
      <div>
        <search>
          <form>
            <input type='text' placeholder={text} value={filterText} onChange={(e) => onFilterTextChange(e.target.value)} /> 
          </form>
        </search>
      </div>
      <div> 
        <input type='checkbox' value={toggled} onChange={(e) => onStockOnlyChange(e.target.checked)} /> 
        Only show products in stock
      </div>
    </>
  )
}

function ProductTable ({ data, filterText, inStockOnly } ) {
  let rows: any[] = [];
  let lastCategory = null
  data.forEach(element => {
    let showProductFromFilter = (filterText === '') || element.name.includes(filterText)  
    if ( element.category !== lastCategory ) {
      rows.push( <ProductCategoryRow  category={element.category} />)
      lastCategory = element.category
    }
    let show = true
    if ( inStockOnly ) {
        show = element.stocked
    }

    show = show && showProductFromFilter
    if (show) {
      rows.push(  
        <ProductRow product={element} />
      )
    }
  });

  return (
    <table> 
      <thead>
        <tr>
          <th> Name </th> <th> Price </th>
        </tr>
      </thead>
      <tbody> {rows} </tbody>
    </table>
  )
}


function ProductCategoryRow ({ category } : any) {

  return ( 
      <h3> {category } </h3>
  )
}

function ProductRow ({product}) {
  let colour = product.stocked ? 'black-text': 'red-text'
  return ( 
    <tr> 
      <th className={colour} >{product.name} </th>
      <th>{product.price} </th>
    </tr> 
  )

}

export function App() {
  return (
    <div>
      <FilterableProductTable data={dataSet}/>
    </div>
  );
}

export default App;
