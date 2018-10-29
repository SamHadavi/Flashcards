console.log('Starting Flashcards application...');

/** express module */
const express = require('express');

/** handlebars module */
const hbs = require('hbs');

/** File Share module */
const fs = require('fs');

/** localhost test port */
const port = process.env.PORT || 8080;

/** 
 * shorthand for the express module 
 * @var {} app
 */
var app = express();

var request = require('request');

/** client-sessions module */
const session = require('client-sessions');