# Abuse Prevention Web Application
## Deborah Mepaiyeda & Nagma Kapoor (CPS803)

![Positive](/public/Positive.png "Positive Tweet")

![Negative](/public/Negative.png "Negative Tweet")

![Neutral](/public/Neutral.png "Neutral Tweet")

## 3 sections in web application:

1. About  
    - Discusses what the project is about
2. Visualization
    - Illustrates various visualizations gathered from the analysis of the data
3. Tweet analyzer
    - Allows you to analyze the sentiments of tweets that you want to post

## Prerequisites 
- Make sure that you have Node.js and Python3 installed

## Data
- We have already generated data for this analysis within the `tweets.csv` and `test_tweets.csv` files, so no need to regenerate this.

## To run web application:

### STEP 1: Run Back-end

#### Run Python/Flask Back-end
- Open another terminal window for the Python/Flask back-end
- Then cd into the `service` (run `cd service`) folder inside tweet-dashboard. This is where the flask app for the back-end web app api exists.
- Run `virtualenv venv` to create a virtual environment for Python/Flask
- Run `source venv/bin/activate` to activate the virtual environment for Python/Flask
- Run `pip3 install -r requirements.txt` which should automatically download dependencies for this project
- If there are missing dependencies this can be downloaded using `pip3 install <dependency>` within the service folder (inside tweet-dashboard)
- To upgrade all the dependencies run: `pip install -r requirements.txt --upgrade`
- To update the requirements text file after upgrading run: `pip freeze > requirements.txt`

### Set-up for Back-End APIs
- In the same backend terminal window (inside `service` folder)
- Run `python3 algorithms.py` to initialize the algorithms for the web application tweet analyzer to work
- Run `flask run`, which should run flask on `http://localhost:3100`


### STEP 2: Run Front-end
- Open another terminal window
- Go into the tweet-dashboard folder (`cd tweet-dashboard`)
- Run `npm install `
- Run `npm start` which should run the react front-end on `http://localhost:3000`

### USING THE TWEET ANALYZER
1. Select the Tweet Analyzer tab on the web application
2. Type a new tweet into the text field
3. Select an Algorithm from the dropdown
4. Click Test: returns a sentiment based on the tweet in a snackbar at the bottom of the page
5. To test more tweets, repeat steps 2-4 for each tweet

*TODO: Add POST Tweet functionality*

### To view our data analysis and algorithm results
- Open `model_generator.ipynb` file
- Run each cell
- <b> NOTE: </b> Make sure that STEP 1 is completed before doing this