
import { NewsContainer, Icon } from './newsElements'
import React, { useContext } from "react";
import { NewsContext } from "../News/NewsContext";
import NewsArticle from "./NewsArticle";

// const NewS = () => {
//   return (
//     <div>
//       <NewsContainer>
//       <Icon to="/">Frog</Icon>
       
//          <h1>NEWS</h1>
       
//       </NewsContainer>
//     </div>
//   )
// }

// export default NewS


function NewS(props) {
  const { data } = useContext(NewsContext);
  console.log(data);

  return (
    <div>
      <NewsContainer>
      <Icon to="/">Frog</Icon>
      <h1 className="head__text">NEWS</h1>
      <div className="all__news">
        {data ? data.articles.map((news) => (
              <NewsArticle data={news} key={news.url} />
            ))
          : "Loading"}
      </div>
      </NewsContainer>
    </div>
  );
}

export default NewS;