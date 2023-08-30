## Before start

go to .env in root directory and set correct values. It is nesessary to set the path for getting data.
If you set 
### `REACT_APP_IS_LOCAL_DATA=true`

it will getting data from public/data.xlsx

So you can realise updating in this file.

If you set
### `REACT_APP_IS_LOCAL_DATA=false`

it is nesessary to set path to server
### `REACT_APP_DATA_URL=http://localhost:5000/`

Next set true values of your Emailjs service:
### `REACT_APP_EMAILJS_SERVICE_ID=YOUR_EMAILJS_SERVICE_ID`
### `REACT_APP_EMAILJS_TEMPLATE_ID=YOUR_EMAILJS_TEMPLATE_ID`
### `REACT_APP_EMAILJS_API_KEY=YOUR_EMAILJS_API_KEY`

# Getting Started

In the project directory, you can run:
### `npm start`

Also you can run:
### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
