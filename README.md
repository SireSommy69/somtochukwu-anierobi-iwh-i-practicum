HubSpot Integration Practicum - Games Custom Object

My Custom Object List Link: https://app.hubspot.com/contacts/49420961/objects/2-41246252/views/all/list

Project Overview This project is part of the Integrating With HubSpot I: Foundations Practicum. It demonstrates integration with HubSpot’s CRM API using Node.js, Express, Axios, and Pug.

A custom object named "Games" was created with the following properties:

Game Name (game_name) - String
Model (name) - String
Color (color) - String
Release Year (release_year) - Number
Price (price) - Number
This application allows users to:

View all game records stored in HubSpot.
Add new game records via a form.
Store and fetch data securely from HubSpot’s CRM.
Features

Custom Object "Games" created in HubSpot.
Data retrieval from HubSpot and displayed on homepage.pug..
Form submission to add new games using updates.pug.
Secure API authentication using .env file.
Routes:
GET / - Fetches and displays all game records.
GET /update-cobj - Displays form to add new games.
POST /update-cobj - Submits new game data to HubSpot.
Setup and Installation

Prerequisites

Node.js installed (check using node -v)
A HubSpot Developer Test Account
A HubSpot Private App with the following scopes:
crm.schemas.custom (read and write)
crm.objects.custom (read and write)
crm.objects.contacts (read and write)
Clone This Repository

git clone https://github.com/SireSommy69/somtochukwu-anierobi-iwh-i-practicum.git
cd somtochukwu-anierobi-iwh-i-practicum
