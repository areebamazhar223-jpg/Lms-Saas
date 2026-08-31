import "./Card.css";


function Card({
  icon,
  title,
  description,
  image,
  children
}) {

  return (

    <div className="common-card">


      {
        image && (

          <img
            src={image}
            alt={title}
            className="common-card-image"
          />

        )
      }




      {
        icon && (

          <div className="common-card-icon">

            {icon}

          </div>

        )
      }





      <h3>
        {title}
      </h3>




      <p>
        {description}
      </p>




      {children}



    </div>

  );

}


export default Card;