export const initialState = {
  mainPosts: [
    {
      img: 'https://blog.f-arts.work/wp-content/uploads/2018/09/nextjs.png.webp',
      User: {
        id: 1,
        name: 'kangyuchan',
      },
      content: 'I love Next.js ♥',
      createdAt: '2020-06-05',
    },
  ],
  imagePaths: ['image'],
};

export const ADD_POST = 'ADD_POST';
export const ADD_DUMMY = 'ADD_DUMMY';

export const addPost = {
  type: ADD_POST,
  data: {
    isLoggedIn: false,
  },
};

export const addDummy = {
  type: ADD_DUMMY,
  data: {
    content: 'Hello!!~',
    UserId: 1,
    User: {
      name: 'yuchan',
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
      };
    }
    case ADD_DUMMY: {
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
