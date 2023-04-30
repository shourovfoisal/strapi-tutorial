
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";

import Homepage from "./pages/Homepage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import SiteHeader from "./components/SiteHeader";

// apollo client
const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SiteHeader />
          <Routes>
            <Route exact path="/" element={<Homepage />}>
            </Route>
            
            <Route path="/details/:id" element={<ReviewDetails />}>
            </Route>

            <Route path="/category/:id" element={<Category />}>
            </Route>
            
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
