import React from 'react';

// Demo Products
const ProductTestdata = [{id: 1,productName: 'Product 1',},{id: 2,productName: 'Product 2',},{id: 3,productName: 'Product 3'}];


class ProductManagment extends React.Component {

    constructor() {
        super();
        const productCounter = 1;
        this.state = {
            cartProductItem: [],
        };
    }
    // Add's Product to Cart    
    addProductInCart(item) {        
        const cartItemProduct = this.state.cartProductItem;
        cartItemProduct.push(item)        
        this.setState({ cartProductItem: cartItemProduct })

    }

    // Removes Product from Cart
    removeProductCart(item) {                
        var removeitems = [...this.state.cartProductItem]; 
        var index = removeitems.indexOf(item)
        if (index !== -1) {
            removeitems.splice(index, 1);
            this.setState({ cartProductItem: removeitems });
        }

    }
     render() {    
        return (
            <div className='container'>                
                <h1>Item List</h1>
                <table>
                    {
                        ProductTestdata.map((item, key) =>
                            <tbody key={item.id}>
                                <tr >
                                    <td>
                                        <label>{item.id}</label>
                                    </td>
                                    <td>
                                        {item.productName}
                                    </td>
                                    <td>
                                        <button onClick={() => this.addProductInCart(item)} >
                                            Add to Basket
                                        </button>
                                    </td>

                                </tr>
                            </tbody>
                        )
                    }
                </table>
               
               
                
                
                <h3>Cart List</h3>
                    <table>
                        {
                            this.state.cartProductItem.map((item, key) =>
                                <tbody key={item.id}>
                                    <tr >
                                        <td>
                                            <label>{item.id}</label>
                                        </td>
                                        <td>
                                            {item.productName}
                                        </td>
                                        <td>
                                        <button onClick={() => this.removeProductCart(item)} >
                                                Remove Product
                                        </button>
                                        </td>

                                    </tr>
                                </tbody>
                            )
                        }
                    </table>                        
                
                
            </div>
            
        );
    }
}
export default ProductManagment;