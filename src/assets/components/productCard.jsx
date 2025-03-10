import "./productCard.css"
export default function ProductCard(props) {

  console.log(props);
  return (
    <div className="product-card">
      <h1>Product Card</h1>
      <img src={ props.photoUrl}></img>
      <span>{props.name}</span>
 <span>LKR. {props.price}</span>  
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, animi.</p>
 
      <p>{ props.description}</p>   </div>
  );
}


