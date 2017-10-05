import { createClient } from "contentful";

export default createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "gfdps8w786tf",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken:
    "8c04fe2857aef70aac523eb3701b35ae79ecd4c303823738bb95e2865a2b7109"
});
