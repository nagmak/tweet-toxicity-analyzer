#!/usr/bin/python
# Import the necessary package to process data in JSON format
try:
    import json
except ImportError:
    import simplejson as json

# Import the tweepy library
import tweepy
import urllib

ACCESS_TOKEN = '772178815414050816-KeN292eY2t0TDNC6h3EpK7VR1qIBKgK'
ACCESS_SECRET = '1iohtKtnbAs3qHryyhgIHU2hLSaTofjx6bbq7jam698QZ'
CONSUMER_KEY = '1SlOCtMrdZBdbKmhsPje5A3mQ'
CONSUMER_SECRET = 'X52EQX9pjVRTJJD5I5byQMcJiz3kznpbBWq6kGs9AOeC6wnW73'

# Setup tweepy to authenticate with Twitter credentials:

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create the api to connect to twitter with your creadentials
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

abusive_words = 'fuck OR bitch OR cunt OR dumb OR ugly OR useless OR ignored OR rumors OR spread OR teased OR crying OR bullying OR abuse OR hit OR neglect OR hate OR racist OR die OR kill OR hurt'

abusive_words.replace(" ", "%20")

public_tweets = tweepy.Cursor(api.search, q=abusive_words, tweet_mode='extended', count=100)
api.home_timeline()
count = 0
for tweet in public_tweets.items(100):
    # print(tweet.text)
    if tweet.lang == "en":
        print(count)
        print(tweet.full_text)
        count = count + 1

# ---------------------------------------------------------------------------------------------------------------------
# Twitter API development use pagination for Iterating through timelines, user lists, direct messages, etc.
# To help make pagination easier and Tweepy has the Cursor object.