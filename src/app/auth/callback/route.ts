import { google } from "googleapis";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const oauth2Client = new google.auth.OAuth2(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/oauth",
  );
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      const session = await supabase.auth.getSession();

      oauth2Client.setCredentials({
        access_token: session.data.session?.provider_token,
        refresh_token: session.data.session?.provider_refresh_token,
      });

      const discovery = google.discovery({ version: "v1", auth: oauth2Client });
      const apis = await discovery.apis.list();
      console.log(
        "Discovery API test:",
        apis.data.items?.length,
        "APIs available",
      );
      const myBusiness = google.mybusinessbusinessinformation({
        version: "v1",
        auth: oauth2Client,
      });

      const myBusinessAccount = google.mybusinessaccountmanagement({
        version: "v1",
        auth: oauth2Client,
      });

      const acc = await myBusinessAccount.accounts.list();
      console.log("Accounts:", acc.data);

      const bu = await myBusiness.accounts.locations.list({
        parent: "accounts/105416875119788294546",
      });

      console.log("Locations:", bu.data);

      const res = await myBusiness.locations.get({
        name: "locations/14049702224434991114",
      });
      console.log(session, res.data);
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
