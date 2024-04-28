import Item from "./Item";
import useHttp from "../hooks/useHttp";
import Error from "./Error";


const requestConfig = {};
//ova komponenta služi za dohvaćanje podataka sa FakeStore-a
export default function ShopList () {
    const {
        data : loadedItems, //postavljamo loadedItems radi korištenja u returnu
        isLoading, 
        error
    } = useHttp('https://fakestoreapi.com/products', requestConfig, [])

    if(isLoading) {
        return <p>Fetching store items...</p> //paragraf koji se prikazuje prilikom dohvaćanja podataka
     }
 
     if(error) {
         return <Error title="failed fetching data.." message={error}/>
     }

    

    //u returnu prikazujemo dobivene podatke iz našeg state-a (items array)
    return (
            <ul className="shop-list">
                {loadedItems.map((shopItem) => {
                    return <Item key={shopItem.id} shopItem={shopItem}/>
                })}
            </ul>
        
    )
}