import axios from "axios";

class AuthService {
  login(user) {
    const body = {
      query: `mutation login($username:String!, $password:String!){
          login(input: {
            username: $username,
            password: $password
          }) {
            access_token
            refresh_token
            expires_in
            token_type
            user {
              id
              email
              name
              created_at
              updated_at
            }
          }
        }`,
      variables: {
        username: user.username,
        password: user.password,
      },
    };

    return axios.post("", body).then((response) => {
      var data = response.data.data ?? response.data;
      //  check if graphql response with a token
      if (data.login && data.login.access_token && data.login.user) {
        data.login.user.access_token = data.login.access_token;
        localStorage.setItem("auth", JSON.stringify(data.login.user));
        return data.login.user;
      }
      // if not check if there is an error
      if (data.errors) {
        return data.errors[0] ?? data.errors;
      }
      // if not then something wrong happened
      return { message: "something went wrong!!!" };
    });
  }

  logout() {
    localStorage.removeItem("auth");
  }

  register(user) {
    return axios.post("signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
