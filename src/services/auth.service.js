import axios from "axios";

const GQL_URL = "http://bot2.test/graphql";

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

    return axios
      .post(GQL_URL, body, {
        headers: {
          "Content-Type": "application/json",
          "X-REQUEST-TYPE": "GraphQL",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.data.login.access_token) {
          localStorage.setItem(
            "auth",
            JSON.stringify(response.data.data.login)
          );
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("auth");
  }

  register(user) {
    return axios.post(GQL_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
