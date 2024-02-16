import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom';
import { addToFavorites, fetchDataByid } from '../../api/contentData';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const DetailsContainer = styled.div`
  margin: 20px;
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .left-side{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 2rem;
        width: 70%;
    }
    .right-side{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }
    .abstred{
        font-size: 1rem;
    }
    .facets{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 2rem;
    }

  }
  .facets-item{
        border: 1px solid black;    
        padding: 1rem;
        display: flex;
        justify-content: space-between;
    }
    .facets-content{    
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
    }
    .image-container{
        display: flex;
        width: 100%;
        gap: 1rem;
        img{
            border-radius: 20px;
            
max-width: 200px;
        }
    }
`;

const Details = () => {
  // Accessing the ID parameter from the URL
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery(
    ["getData", id],
    () => fetchDataByid(id)
  );

  const {mutate} = useMutation(addToFavorites, {
    onSuccess: (data) => {
      // Logic to handle successful mutation
      toast.success("Item successfully added to favorites")
      console.log(data);
    },onError:(error => {
        console.log(error.message);
        toast.info('Item is already been added to the favorite')
    })
  }); // Assuming addToFavorites is your mutation function

  const handleAddToFavorites = () => {
    mutate(data?.data?.id); // Call the mutation function with the ID from data
  };
  console.log(data);

  return (
    <div>
      <Header>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Go back to Home</Link>
      </Header>
      <DetailsContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching data</div>
        ) : (
          <>
          <div className='header'>
            <div className="left-side">
            <h4>{data?.data?.title}</h4>
            <span>{data?.data?.source}</span>
            <span className='abstred'>{data?.data?.abstract}</span>
            </div>
            <div className="right-side">
                <button onClick={handleAddToFavorites}>Add to favorite</button>
                <a href={data?.data?.url}>press to check the full article</a>
            </div>
          </div>
          <br />
          <hr />
          <div className="facets">
            <br />
            <h2>Facets:</h2>
            <br />
            <div className="facets-content">
            {data?.data?.facets.map(item => (
                <div className='facets-item'>
                    <span>{item.type}</span>
                    <span>{item.text}</span>

                </div>
                ))}
            </div>
          </div>
          <br />
          <hr />
          <br/>
          <h2>Media:</h2>
          <div className="media">
            <br />
          <h4>{data?.data?.medias[0]?.caption }</h4>
          <br />
          <div className="image-container">
          {data?.data?.medias[0]?.mediametadatas.map(item => (
                    <div className='media-image'>
                        <a href={item.url}>
                            <img src={item.url} />
                        </a>
                    </div>
                ))}
          </div>

          </div>
          </>
        )}
      </DetailsContainer>
    </div>
  );
};

export default Details;
