#!/usr/bin/python
# Import the necessary package to process data in JSON format
try:
    import json
except ImportError:
    import simplejson as json

# Import the tweepy library
import tweepy
import urllib
import csv
import preprocessor as p

ACCESS_TOKEN = '772178815414050816-KeN292eY2t0TDNC6h3EpK7VR1qIBKgK'
ACCESS_SECRET = '1iohtKtnbAs3qHryyhgIHU2hLSaTofjx6bbq7jam698QZ'
CONSUMER_KEY = '1SlOCtMrdZBdbKmhsPje5A3mQ'
CONSUMER_SECRET = 'X52EQX9pjVRTJJD5I5byQMcJiz3kznpbBWq6kGs9AOeC6wnW73'

# Setup tweepy to authenticate with Twitter credentials:

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create the api to connect to twitter with your creadentials
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

negative_words = 'fuck OR bitch OR cunt OR dumb OR ugly OR useless OR ignored OR rumors OR spread OR teased OR crying OR bullying OR abuse OR hit OR neglect OR hate OR racist OR die OR kill OR hurt'
positive_words = 'happy OR great OR good OR proud OR joy OR friends OR family OR confident OR love OR peace OR fine OR important'

negative_words.replace(" ", "%20")
positive_words.replace(" ", "%20")

# Open/create a file to append data to
csvFile = open('tweets.csv', 'a')

#Use csv writer
csvWriter = csv.writer(csvFile)

positive_tweets = tweepy.Cursor(api.search, q=positive_words, tweet_mode='extended', count=1000)
negative_tweets = tweepy.Cursor(api.search, q=negative_words, tweet_mode='extended', count=1000)
api.home_timeline()
count = 0
for tweet, p_tweet in zip(negative_tweets.items(1000), positive_tweets.items(1000)):
    # print(tweet.text)
    if tweet.lang == "en" and p_tweet.lang == "en":
        print(count)
        # Write a row to the CSV file. I use encode UTF-8
        csvWriter.writerow([tweet.created_at, tweet.full_text])
        print("Negative",tweet.created_at, tweet.full_text)

        csvWriter.writerow([p_tweet.created_at, p_tweet.full_text])
        print("Positive", p_tweet.created_at, p_tweet.full_text)
        count = count + 1

csvFile.close()

#         print('Negative',tweet.full_text)
#         print('Positive', p_tweet.full_text)



# ---------------------------------------------------------------------------------------------------------------------
# Twitter API development use pagination for Iterating through timelines, user lists, direct messages, etc.
# To help make pagination easier and Tweepy has the Cursor object.