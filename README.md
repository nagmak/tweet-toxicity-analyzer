# Abuse Prevention Web Application
## Deborah Mepaiyeda & Nagma Kapoor (CPS803)

## 3 sections:

1. About  
2. Visualization
3. Tweet analyzer

## Prerequisites 
- Make sure that you have Node.js and Python3 installed

## To run web application:
### Front-End:
- Go into the tweet-dashboard folder
- Run `npm install `
- Run `npm start` which should run the react front-end on `http://localhost:3000`

### Back-End:
- Open another Terminal window for the Python/Flask back-end
- Then cd into the `service` folder inside tweet-dashboard. This is where the flask app for the back-end web app api exists.
- Run `virtualenv venv` to create a virtual environment for Python/Flask
- Run `source venv/bin/activate` to activate the virtual environment for Python/Flask
- Run `pip3 install -r requirements.txt` which should automatically download dependencies for this project
- Run `flask run`, which should run flask on `http://localhost:5000`
- If there are missing dependencies this can be downloaded using `pip3 install <dependency>` within the service folder (inside tweet-dashboard)

## To run Twitter Connection and Model Generator:

### Twitter Connection file (Twitter_connection.py)
### Model Generator file (model_generator.ipynb)