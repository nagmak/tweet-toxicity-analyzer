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

# Data Preprocessing Imports
import preprocessor as p
from textblob import TextBlob
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer

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

# Removes punctuations
def form_sentence(tweet):
    tweet_blob = TextBlob(tweet)
    return ' '.join(tweet_blob.words)

# Removes stopwords
def no_user_alpha(tweet):
    tweet_list = [ele for ele in tweet.split() if ele != 'user']
    clean_tokens = [t for t in tweet_list if re.match(r'[^\W\d]*$', t)]
    clean_s = ' '.join(clean_tokens)
    clean_mess = [word for word in clean_s.split() if word.lower() not in stopwords.words('english')]
    return clean_mess

# Normalizing tweets
def normalization(tweet_list):
        lem = WordNetLemmatizer()
        normalized_tweet = []
        for word in tweet_list:
            normalized_text = lem.lemmatize(word,'v')
            normalized_tweet.append(normalized_text)
        return normalized_tweet

for tweet, p_tweet in zip(negative_tweets.items(1000), positive_tweets.items(1000)):
    # print(tweet.text)
    if tweet.lang == "en" and p_tweet.lang == "en":
        print(count)

        # Removing punctuation
        tweet.full_text = form_sentence(tweet.full_text)
        p_tweet.full_text = form_sentence(p_tweet.full_text)

        # Removing stopwords: is, are, have - increases efficiency
        tweet.full_text = no_user_alpha(tweet.full_text)
        p_tweet.full_text = no_user_alpha(p_tweet.full_text)

        # Normalizing
        tweet.full_text = normalization(tweet.full_text)
        p_tweet.full_text = normalization(p_tweet.full_text)

        # Write a row to the CSV file. I use encode UTF-8
        # Cols: Created At, Tweets Array, Positive/Negative
        csvWriter.writerow([tweet.created_at, tweet.full_text, 1])
        print("Negative",tweet.created_at, tweet.full_text)

        csvWriter.writerow([p_tweet.created_at, p_tweet.full_text, 0])
        print("Positive", p_tweet.created_at, p_tweet.full_text)
        count = count + 1

csvFile.close()



# ---------------------------------------------------------------------------------------------------------------------
# Twitter API development use pagination for Iterating through timelines, user lists, direct messages, etc.
# To help make pagination easier and Tweepy has the Cursor object.