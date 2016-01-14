# TV-presenter
Simple Node project for displaying images from a folder in a browser (on a TV)

I run node on a synology diskstation. People place images in the media folder and they are atomatically loaded and displayed in a web-browser on a tv.

##Prerequisites

Node (npm)

##Installation
    npm install

##usage
    npm start

Place images in the media folder.
Navigate to server:8006 in a browser that should display the images.

##forever
Use forever to keep the process running

    npm install forever
    forever start server.js

##Credits
A quick hack by Fredrik Melén Januari 2016

This is the initial release. Much could be done, so please do.
