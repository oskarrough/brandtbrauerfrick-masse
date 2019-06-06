Website for the song "Masse" by Brandt Brauer Frick. 

## What?

It is basically a list of videos that are synced on load and whenever you tap any.  
Tapping a video also mutes every other video, allowing you to listen to solo voices.

There's a bit more code for two overlays with credits and tour dates as well as the share button.

## Developing

> Web components and ES modules all the way. No build.

- `yarn start`s a local development server on http://localhost:3000
- `yarn prettier` formats all css and javascript using prettier
- `yarn test` runs eslint on the code

### Browser support

Any [browser with ES module support](https://caniuse.com/#feat=es6-module).

But no Safari because it has a sync issue with the videos.
And no smaller screens because we did not take time to create a layout that's worth it.

## Deploying

Master branch automatically deploys to https://masse.video/

## Credits

Thanks to Brandt Brauer Frick et al for the song, videos and opportunity to make fun stuff!
