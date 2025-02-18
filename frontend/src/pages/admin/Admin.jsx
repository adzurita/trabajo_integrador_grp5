import * as React from "react";
import { Admin, Resource } from 'react-admin';
import fakeDataProvider from "ra-data-fakerest";
import { PostList, PostEdit, PostCreate, PostIcon } from './components/posts/ProductCreate';

export const AdminPage = () => {  
  const dataProvider = fakeDataProvider({
    posts: [
      { id: 1, title: "Post 1", body: "Contenido del post 1" },
      { id: 2, title: "Post 2", body: "Contenido del post 2" },
    ],
  });

  return (
    <Admin basename="/admin" dataProvider={dataProvider}>
      <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    </Admin>
  );
};