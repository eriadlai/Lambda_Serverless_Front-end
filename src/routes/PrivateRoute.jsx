import { Outlet } from "react-router-dom";
import Layout from "../pages/Layout";
//https://universidadesproyectofinal.auth.us-west-1.amazoncognito.com/login?client_id=7shjh09uptim152gkdnibod37l&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://127.0.0.1:8000/callback
const PrivateRoute = () => {
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default PrivateRoute;
