import StoryblokClient from "storyblok-js-client";

const Instance = new StoryblokClient({
    accessToken: process.env['REACT_APP_STORYBLOK_API_KEY'],
});
  
export default Instance;