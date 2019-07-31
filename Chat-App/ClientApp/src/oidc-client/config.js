import * as Oidc from "oidc-client";

const config = {
    authority: "http://localhost:5000",
    client_id: "chatappJS",
    redirect_uri: "https://localhost:5001/",
    response_type: "code",
    scope: "openid profile chatapp",
    post_logout_redirect_uri : "https://localhost:5001/"
};

export const UserManager = new Oidc.UserManager(config);