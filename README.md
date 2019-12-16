# Abuse Prevention Web Application
## Deborah Mepaiyeda & Nagma Kapoor (CPS803)

## 3 sections in web application:

1. About  
    - Discusses what the project is about
2. Visualization
    - Illustrates various visualizations gathered from the analysis of the data
3. Tweet analyzer
    - Allows you to analyze the sentiments of tweets that you want to post

## Prerequisites 
- Make sure that you have Node.js and Python3 installed
- We have already generated data for this analysis within the `tweets.csv` and `test_tweets.csv` files, so no need to regenerate this.

## To run web application:

### STEP 1: Run Back-end
#### Generate Data 
- Open a terminal window in the project folder 
- Run `python3 Twitter_connection.py`
- This will run do the data preprocessing and generate the tweet csv files

### Set-up for Back-End APIs
- Open a new Terminal window and cd into the `service` folder inside tweet-dashboard.
- Run `python3 algorithms.py` to initialize the algorithms for the web application tweet analyzer to work

#### Run Python/Flask Back-end
- Open another terminal window for the Python/Flask back-end
- Then cd into the `service` (run `cd service`) folder inside tweet-dashboard. This is where the flask app for the back-end web app api exists.
- Run `virtualenv venv` to create a virtual environment for Python/Flask
- Run `source venv/bin/activate` to activate the virtual environment for Python/Flask
- Run `pip3 install -r requirements.txt` which should automatically download dependencies for this project
- Run `flask run`, which should run flask on `http://localhost:5000`
- If there are missing dependencies this can be downloaded using `pip3 install <dependency>` within the service folder (inside tweet-dashboard)

### STEP 2: Run Front-end
- Open another terminal window
- Go into the tweet-dashboard folder (`cd tweet-dashboard`)
- Run `npm install `
- Run `npm start` which should run the react front-end on `http://localhost:3000`

### To view our data analysis and algorithm results
- Open `model_generator.ipynb` file
- Run each cell
- <b> NOTE: </b> Make sure that STEP 1 is completed before doing this