import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';

var productItems = [];
var productCartItems = [];
productItems.push({index: 1, value: "Product 1", done: false});
productItems.push({index: 2, value: "Product 2", done: false});
productItems.push({index: 3, value: "Product 3", done: false});
productItems.push({index: 4, value: "Product 4", done: false});

class ProductList extends React.Component {
  render () {
    var items = this.props.items.map((item, index) => {
      return (
        <ProductListItem key={index} item={item} index={index} addtoCartItem={this.props.addtoCartItem} markTodoDone={this.props.markTodoDone} />
      );
    });
    return (
      <div className=''>
        {items}
      </div> 
    );
  }
}
  
class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.addtoCartItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.addtoCartItem(index);
  }
  render () {
    return(
      <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div>
          <h3>{this.props.item.value}</h3>
        </div>
        <p>Loream ipsum Dummy content Loream ipsum Dummy content Loream ipsum Dummy content Loream ipsum Dummy content</p>
        <button type="button" className="btn btn-default" onClick={this.onClickDone}>Add To Cart</button>
      </div>     
    );
  }
}

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new product"/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class ProductHeader extends React.Component {
  render () {
    return <h1 className='title'>Product list</h1>;
  }
}
  
class ProductApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.addtoCartItem = this.addtoCartItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {productItems: productItems};
  }
  addItem(todoItem) {
    productItems.unshift({
      index: productItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({productItems: productItems});
  }
  addtoCartItem(itemIndex) {
    //productItems.splice(itemIndex, 1);
    //this.setState({productItems: productItems});
    var todo = productItems[itemIndex];
    productItems.splice(itemIndex, 1);
    productCartItems.push(productItems);
  }
  markTodoDone(itemIndex) {
    var todo = productItems[itemIndex];
    productItems.splice(itemIndex, 1);
    productCartItems.push(productCartItems);
    todo.done = !todo.done;
    todo.done ? productItems.push(todo) : productItems.unshift(todo);
    this.setState({productItems: productItems});  
  }
  render() {
    return (
      <div id="main">
        <ProductHeader />
        <ProductList items={this.props.initItems} addtoCartItem={this.addtoCartItem} markTodoDone={this.markTodoDone}/>
        
      </div>
    );
  }
}

ReactDOM.render(<ProductApp initItems={productItems}/>, document.getElementById('app'));
export default ProductApp;