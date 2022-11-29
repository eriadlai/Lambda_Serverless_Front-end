import { useEffect } from "react";
import { Amplify, Auth, Hub } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
const LoginPage = () => {
  Amplify.configure({
    Auth: {
      region: "us-west-1",
      userPoolId: "us-west-1_SXzBRDZvQ",
      userPoolWebClientId: "7shjh09uptim152gkdnibod37l",
      mandatorySignIn: true,
      oauth: {
        domain:
          "https://universidadesproyectofinal.auth.us-west-1.amazoncognito.com",
        scope: ["email", "openid", "phone", "profile"],
        redirectSignIn: "https://127.0.0.1:8000/callback",
        redirectSignOut: "https://127.0.0.1:8000/signout",
        responseType: "token",
      },
    },
  });

  useEffect(() => {
    Hub.listen("auth", ({ payload: { event, data, token } }) => {
      switch (event) {
        case "signIn":
        case "cognitoHostedUI":
          console.log("Authenticated...");
          console.log(token);
          break;
        case "signIn_failure":
        case "cognitoHostedUI_failure":
          console.log("Error", data);
          break;
      }
    });
  }, []);
  return (
    <main className="flex-grow pt-8 pb-12 ">
      <button onClick={() => Auth.federatedSignIn()}>
        Redirect to Cognito Hosted UI
      </button>
    </main>
  );
};

export default withAuthenticator(LoginPage);
