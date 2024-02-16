import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useQuery, useMutation } from 'react-query';
import { fetchFavorites, deleteFavorite } from '../../api/contentData';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast for notifications

// Styled wrapper for FavoritePage
const StyledFavoritePage = styled.div`
 .article-container {
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
      .header-content{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      .split-text{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    ul{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }
`;

const Header = styled.header`
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
`;

const Message = styled.div`
  color: green;
`;

const FavoritePage = () => {
  const { data, isLoading, isError, refetch } = useQuery('favorites', fetchFavorites);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const deleteMutation = useMutation(deleteFavorite, {
    onSuccess: () => {
      // Set delete success to true
      setDeleteSuccess(true);
      // Refetch the favorites data after deletion
      refetch();
      // Show success toast notification
      toast.success('Item successfully deleted from favorites');
    },
    onError: (error) => {
      console.error('Error deleting favorite:', error);
      // Show error toast notification
      toast.error('Failed to delete item from favorites');
    },
  });

  const handleDelete = async (id) => {
    try {
      // Execute the mutation
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  console.log(data);

  return (
    <StyledFavoritePage>
      <Header>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Go back to Home</Link>
      </Header>
      <br />    
      <h1>Favorites </h1>
      <br />
      {data && (
        <ul>
          {data?.data.map((item) => (
            <li className="article-container" key={item.view.id}>
              <div className="header-content">
                <h3>{item.view.title}</h3>
                <div className="split-text">
                  <p>{item.view.source}</p>
                  <p>{item.view.section}</p>
                </div>
              </div>
              <ul>
                <li><a href={item.view.url}>Link</a></li>
                <li><a href={`/details/${item.view.id}`}>more details</a></li>
              </ul>
              <button onClick={() => handleDelete(item?.id)}>Delete</button>
            </li>
          ))}
        </ul> 
      )}
    </StyledFavoritePage>
  );
};

export default FavoritePage;
