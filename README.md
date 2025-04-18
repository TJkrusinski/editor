# Lil Video Editor

This is a test to see if using Puppeteer would allow me to export png files in the rec2020 colorspace with ICC profiles.

The short of it is that the way puppeteer communicates with the chromium process it launches, no.

Puppeteer uses the Chrome Developer Protocol to communicate with the chromium instance is creates. It calls the [Page.captureScreenshot](https://chromedevtools.github.io/devtools-protocol/tot/Page/#method-captureScreenshot) when a screenshot is taken of a page. There are no options in that function to set any options about the colorspace the page is running in.

Likewise, when launching the browser instance, there seem to be no options related to the color mode of the browser.

## Running

`$ deno run dev` - Runs the vite server

`$ deno -A server/server.ts` - Runs the websocket server and the process manager for puppeteer.

## Encoding

the `render` shell script will concat the pngs generated together and create a ProRes 4444 file in rec2020 colorspace.

## Adding ICC profiles to png images

`$ magick input.png -profile icc/rec2020.icc out.png` will add the ICC profile to the input image and save it as an output image.

To check to see if an image has an ICC profile: `$ identify -verbose image.png | grep -A10 "Profile-icc"` 