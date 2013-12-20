Copyright (c) 2013 YunJiang.Fang contributors (listed above).

node-qiubai
===========

use jsdom and node-webkit to read qiubai


Source Install / Manual Compilation
-----------------------------------

To compile from source it's easiest to use 
[`nw-gyp`](https://github.com/rogerwang/nw-gyp):

use npm
``` bash
$ mkdir node_modules
$ npm install node-qiubai
$ cd node_modules
$ pushd .
$ cd node_modules/jsdom/node_modules/contextify
$ nw-gyp rebuild
$ popd
$ nw node-qiubai
```

use npm in global
``` bash
$ sudo npm install node-qiubai -g
$ cd $NODE_PATH
$ cd node_modules/jsdom/node_modules/contextify
$ sudo nw-gyp rebuild
$ cd ~
$ nw `node -e "require('node-mqiubai')"`
```

use github
``` bash
$ git clone git://github.com/fov42550564/node-qiubai.git
$ cd node-qiubai
$ mkdir node_modules
$ npm install jsdom
$ pushd .
$ cd node_modules/jsdom/node_modules/contextify
$ nw-gyp rebuild
$ popd
$ nw .
```
