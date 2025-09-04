// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  return ( 
    <>
      <div>
        <SearchBar />
        <div> </div>
        <ProductTable data={data}/>
      </div>
    </>
  )

}


function SearchBar () {

  return (
    <>
      <div>
        <search>
          <form>
            <input placeholder='Search...' /> 
          </form>
        </search>
      </div>
      <div> 
        <input type='radio' /> 
        Only show products in stock
      </div>
    </>
  )
}

function ProductTable ({ data } ) {
  let rows: any[] = [];
  let lastCategory = null
  let colour = 'black'
  data.forEach(element => {
    if ( element.category !== lastCategory ) {
      rows.push( <ProductCategoryRow  category={element.category} />)
      lastCategory = element.category
    }

    rows.push(  
      <ProductRow product={element} />
    )
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
