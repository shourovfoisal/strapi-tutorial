import React from 'react'
import {Link, useParams} from 'react-router-dom'
// import useFetch from '../hooks/useFetch';
import {useQuery, gql} from "@apollo/client";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DOMpurify from "dompurify";

const REVIEW = gql`
  query GetReview($id:ID!) {
    review(id:$id) {
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
`

export default function ReviewDetails() {

  const {id} = useParams();


  // const {loading, error, data} = useFetch(`http://localhost:1337/api/reviews/${id}`);
  const {loading, error, data} = useQuery(REVIEW, {
    variables: {
      id
    }
  });
  console.log(data);


  if(loading) return <p>Loading ...</p>
  if(error) return <p>Error :(</p>

  return (
    <div className="review-card">
      <div className="rating">{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>

      {
        data.review.data.attributes.categories.data.map(reviewCategory => 
          <small key={reviewCategory.id}>{reviewCategory.attributes.name}</small>
        )
      }

      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {
          DOMpurify.sanitize(data.review.data.attributes.body)
        }
      </ReactMarkdown>
      <Link to="/">Back to Home</Link>
    </div>
  )
}
