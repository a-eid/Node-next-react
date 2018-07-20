verify facebook access token

GET graph.facebook.com/debug_token?
    input_token={token-to-inspect}
    &access_token={app_id}|{app_secret}


verify google access token

https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=<access_token>
