import React from 'react'
import { Link } from 'react-router-dom'
import { gql, useQuery } from "@apollo/client";

const CATEGORIES = gql`
  query GetCategories {
    categories {
      data {
          id
          attributes {
            name
          }
      }
    }
  }
`;

export default function SiteHeader() {

  const {loading, data, error} = useQuery(CATEGORIES);
  console.log(data);

  return (
    <div className='site-header'>
        <Link to="/"><h1>Ninja Reviews</h1></Link>
        <nav className="categories">
          <span>Filter reviews by category:</span>
          {
            data.categories.data.map(category => 
              <Link key={category.id} to={`/category/${category.id}`}>{category.attributes.name}</Link>
            )
          }
        </nav>
    </div>
  )
}
