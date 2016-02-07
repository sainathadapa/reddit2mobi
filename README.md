reddit2mobi
===========

This project helps to export a reddit post into a mobi/epub via html.

# Instructions
- Install [NodeJS](http://nodejs.org/) and [npm](https://www.npmjs.com/)
- Clone this repo
- `cd reddit2mobi; npm install`
- Run _run_reddit2html.js_ script. 
	- Pass the url of the reddit post as an argument. Optionally, pass the depth (integer) to limit the maximum depth of subtrees in the thread.
  - Usage: `nodejs run_reddit2html.js url depth > out.html`
- Install [Calibre](http://calibre-ebook.com/download)
- Convert the generated html into epub/mobi using the _ebook-convert_ from Calibre.
  - Usage: `ebook-convert in.html out.mobi`

# Other resources
- See the example files to see the sample generated output.
  - Example files are generated by these commands:
  -  `nodejs run_reddit2html.js https://www.reddit.com/r/MachineLearning/comments/2fxi6v/ama_michael_i_jordan/ 10 > example1.html`
  -  `ebook-convert example1.html example1.mobi`
  -  `nodejs run_reddit2html.js https://www.reddit.com/r/Android/comments/2jbt42/google_announces_android_50_lollipop 3 > example2.html`
  -  `ebook-convert example2.html example2.mobi`
- [Reddit API](https://www.reddit.com/dev/api#GET_comments_{article})
- [Ebook-convert](http://manual.calibre-ebook.com/cli/ebook-convert.html)
