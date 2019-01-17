# start-concurrently
Start multiple npm scripts concurrently

## Install
```
npm install start-concurrently -S
```

## Usage
Configure in `package.json` scripts witch should be run concurrently, like:
```javascript
  //...
  "scripts": {
    "start": "start-concurrently",
    "start-db": "command to start local database",
    "start-app": "node src/app.js",
    "start-live-reload": "livereaload src/app.js",
    //...
  },
  //...
}
```

Notes:
* define a launching script with command `start-concurrently`
* all scripts, those should be started concurrently, have key starting with prefix <code>\`${key-of-launching-script}-\`</code> (in example above is the prefix is `'start-'`)
* then you launch those scripts by single command: `npm run start`
* console outputs from each script will have colored prefix like: <pre>
<b style="color:green">[db] </b>Starting database, listening at port 8899....
<b style="color:yellow">[app] </b>App started, open its page at url: http://localhost:3000
</pre>
