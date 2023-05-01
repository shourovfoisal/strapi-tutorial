import React from 'react'
import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

const CATEGORY = gql`
  query GetCategory($id:ID!) {
    category(id:$id) {
      data {
          id
          attributes {
            name
            reviews {
              data {
                id
                attributes {
                  title
                  body
                  rating
                  categories {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
      }
    }
  }
`;

export default function Category() {

  const {id} = useParams();

  const {loading, data, error} = useQuery(CATEGORY, {
    variables: {
      id
    }
  });

  if (loading) return <p>Loading posts for category...</p>
  if (error) return <p>Error fetching posts for category</p>
  console.log(data);



  return (
    <div>
      <h2>{data.category.data.attributes.name}</h2>

      {
        data.category.data.attributes.reviews.data.map(review =>
          <div key={review.id} className="review-card">
            <div className="rating">{review.attributes.rating}</div>
            <h2>{review.attributes.title}</h2>

            {
              review.attributes.categories.data.map(reviewCategory => 
                <small key={reviewCategory.id}>{reviewCategory.attributes.name}</small>
              )
            }

            <p>{review.attributes.body.substring(0, 200)}...</p>
            <Link to={`/details/${review.id}`}>Read More</Link>
          </div>
        )
      }
    </div>
  )
}
