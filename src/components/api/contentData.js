export const fetchData = async (number, page) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API}/viewed/getPeriod/${number}?limit=5&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const fetchDataByid = async (id) => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API}/viewed/getOne/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


export const addToFavorites = async (id) => {
  console.log(id);
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API}/favorite/add/${id}`, {
      method: 'POST', // Change method to POST
      headers: {
        'Content-Type': 'application/json', // Specify content type
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }), // Pass id as JSON in the request body
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


export const fetchFavorites = async () => {
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API}/favorite/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};


export const deleteFavorite = async (id) => {
  console.log(id);
  try {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_API}/favorite/${id}`, {
      method: 'DELETE', // Change method to DELETE
      headers: {
        'Content-Type': 'application/json', // Specify content type
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};