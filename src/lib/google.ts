// import { google } from "googleapis";
// import { env } from "./env";

// export const oauth2Client = new google.auth.OAuth2(
//   env.GOOGLE_CLIENT_ID,
//   env.GOOGLE_CLIENT_SECRET,
//   "http://localhost:3000/oauth",
// );

export const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/business.manage",
];

// oauth2Client.generateAuthUrl({
//   // 'online' (default) or 'offline' (gets refresh_token)
//   access_type: "offline",
//   /** Pass in the scopes array defined above.
//    * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
//   scope: scopes,
//   // Enable incremental authorization. Recommended as a best practice.
//   //   include_granted_scopes: true,
//   // Include the state parameter to reduce the risk of CSRF attacks.
//   //   state: state
// });

// const businessInfo = google.mybusinessbusinessinformation("v1");
