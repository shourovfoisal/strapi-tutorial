import React from 'react'
// import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom';
import { useQuery, gql } from "@apollo/client";

const REVIEWS = gql`
  query GetReviews {
    reviews {
      data {
          id
          attributes {
            title
            rating
            body
          }
      }
    }
  }
`

export default function Homepage() {

  // const {loading, error, data} = useFetch("http://localhost:1337/api/reviews");
  const {loading, error, data} = useQuery(REVIEWS);
  console.log( data);

  if(loading) return <p>Loading ...</p>
  if(error) return <p>Error :(</p>

  return (
    <div>
      {
      data.reviews.data.map(review => 
        
        <div key={review.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <h2>{review.attributes.title}</h2>

          <small>console list</small>
          <p>{review.attributes.body.substring(0, 200)}...</p>
          <Link to={`/details/${review.id}`}>Read More</Link>
        </div>

      )}
    </div>
  )
}
