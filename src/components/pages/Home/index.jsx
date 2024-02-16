import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchData } from "../../api/contentData";
import styled from "@emotion/styled";

const HomePageContainer = styled.div`
  .favoritebtn {
    position: absolute;
    right: 2rem;
    top: 1rem;
  }
  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    li.article-container {
      list-style: none;
      border: 1px solid black;
      width: 420px;
      height: 150px;
      cursor: pointer;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      .header-content {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .split-text {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .pages {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 1rem 0;
    span {
      cursor: pointer;
    }
  }
`;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [articleNumber, setArticleNumber] = useState(1);

  // Use the page state as a dependency in the useQuery hook
  const { data, isLoading, isError, refetch } = useQuery(
    ["getData", articleNumber, page], // Include page in the query key
    () => fetchData(articleNumber, page) // Fetch data based on articleNumber and page
  );

  const handleRadioChange = (event) => {
    setArticleNumber(Number(event.target.value));
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <HomePageContainer>
      <h1>Articles</h1>
      <button className="favoritebtn">
        <a href="/favorite">Favorites page</a>
      </button>
      <div style={{ marginLeft: "3rem" }}>
        <br />
        <h4>Get the most viewed articles for the last 1, 7 and 30 days</h4>
        <br />
        <input
          type="radio"
          id="articleNumber1"
          name="articleNumber"
          value="1"
          checked={articleNumber === 1}
          onChange={handleRadioChange}
        />
        <label htmlFor="articleNumber1">1</label>

        <input
          type="radio"
          id="articleNumber7"
          name="articleNumber"
          value="7"
          checked={articleNumber === 7}
          onChange={handleRadioChange}
        />
        <label htmlFor="articleNumber7">7</label>

        <input
          type="radio"
          id="articleNumber30"
          name="articleNumber"
          value="30"
          checked={articleNumber === 30}
          onChange={handleRadioChange}
        />
        <label htmlFor="articleNumber30">30</label>
      </div>
      <br />
      {data && (
        <ul>
          {data?.data.map((item) => (
            <li className="article-container" key={item.id}>
              <div className="header-content">
                <h3>{item.title}</h3>
                <div className="split-text">
                  <p>{item.source}</p>
                  <p>{item.section}</p>
                </div>
              </div>
              <ul>
                <li>
                  <a href={item.url}>Link</a>
                </li>
                <li>
                  <a href={`/details/${item.id}`}>more details</a>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
      <div className="pages">
        {/* Render page numbers dynamically */}
        {[1, 2, 3, 4].map((pageNumber) => (
          <span key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
            {pageNumber}
          </span>
        ))}
      </div>
    </HomePageContainer>
  );
};

export default HomePage;

