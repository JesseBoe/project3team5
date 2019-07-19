Inside of this folder is where our socketIO server lives. When run locally `npm start` is coded to launch this first.
This is because I changed the 'npm start' script inside of the package.json to concurrently use the command 
`node server/index`. I still need to test pushing this to heroku, but I am anticipating for the socketIO part of the 
server to not launch on its own.