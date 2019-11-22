# Import the necessary package to process data in JSON format
try:
    import json
except ImportError:
    import simplejson as json

# Import the tweepy library
import tweepy

ACCESS_TOKEN = '1197894908486520833-OsETwcs9lacQ9XaJ3LsXonFbCr1T9o'
ACCESS_SECRET = 'EqP29l0fuPyiinoYab4vXTj29Dd7SacW2kOMxxe7wzrgD'
CONSUMER_KEY = 'd6YGsCG0hdR3nJRqB3ygAYpZc'
CONSUMER_SECRET = 'OkUFKUeZeyIs6DKbDd8BXlv4AwILEMBwgdCVN3Tp4THZuOSwlk'

# Setup tweepy to authenticate with Twitter credentials:

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create the api to connect to twitter with your creadentials
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)
# ---------------------------------------------------------------------------------------------------------------------
# wait_on_rate_limit= True;  will make the api to automatically wait for rate limits to replenish
# wait_on_rate_limit_notify= Ture;  will make the api  to print a notification when Tweepyis waiting for rate limits to replenish
# ---------------------------------------------------------------------------------------------------------------------


# ---------------------------------------------------------------------------------------------------------------------
# The following loop will print most recent statuses, including retweets, posted by the authenticating user and that user’s friends.
# This is the equivalent of /timeline/home on the Web.
# ---------------------------------------------------------------------------------------------------------------------


# http://docs.tweepy.org/en/v3.8.0/getting_started.html
public_tweets = tweepy.Cursor(api.search, q='#metoo', tweet_mode='extended', count=10)
    # api.home_timeline()
count = 0
for tweet in public_tweets.items(5):
    # print(tweet.text)
    print(count)
    print(tweet.full_text)
    count = count + 1

# ---------------------------------------------------------------------------------------------------------------------
# Twitter API development use pagination for Iterating through timelines, user lists, direct messages, etc.
# To help make pagination easier and Tweepy has the Cursor object.