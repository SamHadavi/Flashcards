console.log('Starting app...');

const express = require('express');
const hbs = require('hbs');
var request = require('request');
const session = require('client-sessions');
const fs = require('fs');
var app = require('./');
const port = process.env.PORT || 8080;


app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});