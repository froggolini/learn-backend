# learn-backend
## Basic Node.js
#### Run JavaScript file using Node.js
- `index.js`:

    ```js
    const message = (name) => {
    console.log(`Hello ${name}`);
    }
    
    message('JavaScript');
    ```
- Run it.
    ```bash
    $ node index.js 
    ```

### Node.js Global Object
**true globals**:
- `global` : Global namespaces. Any member in this object can be accessed on a global scope.
- `process` : provides interaction with running Node.js processes.
- `console` : provides various STDIO functionality.
- `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval`.

**Pseudo-globals** (inherited from module scope):
- `module` : used for modularization system in Node.js.
- `__filename` : keyword to get the location of the executable JavaScript file. This keyword is not available in Node.js REPL (**R**ead-**E**val-**P**rint-**L**oop).
- `__dirname` : keyword to get the root directory of the executable JavaScript file.
- `require` : used to import JavaScript modules.

### Process Object
- [Documentation](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env)
- Example:

    ```js
    const server = new Server({
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : 'dicoding.com',
    });
    ```

- Assign a value to the `process.env` property:
    ```bash
    $ NODE_ENV=production node app.js
    ```

- Using `process` object to get CPU information.
    ```js
    const cpuInformation = process.memoryUsage();
    
    console.log(cpuInformation);
    
    /* output
    {
    rss: 14569472,
    heapTotal: 2654208,
    heapUsed: 1788896,
    external: 855681,
    arrayBuffers: 9898
    }
    */
    ```

- `process.argv`:
    ```bash
    $ node app.js harry potter
    ``` 
    Then the `process.argv` array will be worth:
    - The first element: The complete address (path) of the location of the node running the process.
    - Second element : Address (path) of executable JavaScript file (app.js)
    - The third element: "harry"
    - Fourth element: "potter"

    Example:
    ```js
    const firstName = process.argv[2];
    const lastName = process.argv[3];
    
    console.log(`Hello ${firstName} ${lastName}`);

    /* Output:
    ** Hello harry potter
    */
    ```

### Modularization
- `user.js`:
    ```js
    const firstName = 'Harry';
    const lastName = 'Potter';
    
    
    /* gunakan object literal
    untuk mengekspor lebih dari satu nilai. */
    module.exports = { firstName, lastName };
    ```
- `app.js`:
    ```js
    /**
    * Gunakan object destructuring untuk mengimpor lebih dari satu nilai pada modul.
    */
    const { firstName, lastName } = require('./user');
    
    
    console.log(firstName);
    console.log(lastName);
    
    
    /**
    * output:
    * Harry
    * Potter
    */
    ```

There are 3 types of modules in Node.js, you already know two of them. Here are the details:
- **local module** : a locally created module is located in your project's Node.js.
- **core module** : Node.js built-in modules are located in the **lib** folder where Node.js is installed on your computer. Core modules can be used anywhere.
- **third party module** : a module installed via the Node Package Manager. If a third party module is installed locally, it will be stored in the **node_modules** folder in your Node.js project. When installed globally, it will be stored in the node_modules folder where Node.js is installed.

### Node Package Manager
- Install:
    ```bash
    $ npm install moment
    ```
- Use the module:
    ```js
    const moment = require('moment');
    
    const date = moment().format("MMM Do YY");
    console.log(date);
    
    /**
     * output:
     * Jan 11th 21
     */
    ```
- Uninstall:
    ```bash
    $ npm uninstall moment
    ```
- NPM as runner script:
    ```js
    "scripts": {
        "start-dev": "NODE_ENV=development node app.js",
        "start": "NODE_ENV=production node app.js"
    }
    ```
    - Run:
        ```bash
        $ npm run start-dev
        ```

### Events
```js
const { EventEmitter } = require('events');
 
const myEventEmitter = new EventEmitter();
 
// fungsi yang akan dijalankan ketika event coffee-order terjadi
const makeCoffee = ({ name }) => {
    console.log(`Kopi ${name} telah dibuat!`);
};
 
const makeBill = ({ price }) => {
    console.log(`Bill sebesar ${price} telah dibuat!`);
}
 
// mendaftarkan fungsi sebagai listener event coffee-order
myEventEmitter.on('coffee-order', makeCoffee);
myEventEmitter.on('coffee-order', makeBill);

// Memicu event 'coffee-order' terjadi.
myEventEmitter.emit('coffee-order', { name: 'Tubruk', price: 15000 });
 
/**
 * output:
 * Kopi Tubruk telah dibuat!
 * Bill sebesar 15000 telah dibuat!
 */
```

### Filesystem
Asynchronous:
```js
const fs = require('fs');
 
const fileReadCallback = (error, data) => {
    if(error) {
        console.log('Gagal membaca berkas');
        return;
    }
    console.log(data);
};
 
fs.readFile('todo.txt', 'UTF-8', fileReadCallback);
```

Synchronous:
```js
const fs = require('fs');
 
const data = fs.readFileSync('todo.txt', 'UTF-8');
console.log(data);
```

> Use `path.resolve(__dirname, 'notes.txt');` from the core modules path in setting the file address completely and dynamically.

### Readable Stream
```js
const fs = require('fs');
 
const readableStream = fs.createReadStream('./article.txt', {
    highWaterMark: 10
});
 
readableStream.on('readable', () => {
    try {
        process.stdout.write(`[${readableStream.read()}]`);
    } catch(error) {
        // catch the error when the chunk cannot be read.
    }
});
 
readableStream.on('end', () => {
    console.log('Done');
});
```

### Writable Stream
```js
const fs = require('fs');
 
const writableStream = fs.createWriteStream('output.txt');
 
writableStream.write('Ini merupakan teks baris pertama!\n');
writableStream.write('Ini merupakan teks baris kedua!\n');
writableStream.end('Akhir dari writable stream!');
```

