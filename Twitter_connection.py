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

# Sentiment analyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer

ACCESS_TOKEN = '772178815414050816-KeN292eY2t0TDNC6h3EpK7VR1qIBKgK'
ACCESS_SECRET = '1iohtKtnbAs3qHryyhgIHU2hLSaTofjx6bbq7jam698QZ'
CONSUMER_KEY = '1SlOCtMrdZBdbKmhsPje5A3mQ'
CONSUMER_SECRET = 'X52EQX9pjVRTJJD5I5byQMcJiz3kznpbBWq6kGs9AOeC6wnW73'

# Setup tweepy to authenticate with Twitter credentials:

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

# Create the api to connect to twitter with your creadentials
api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

# Tweet query terms
words = 'gamergate OR trump OR nfl OR weinstein OR canada OR women OR #WomenInTech OR tech OR code OR #ClimateChange'

words.replace(" ", "%20")

# Open/create a file to append data to
csvFile = open('tweets.csv', 'a')
csvTestFile = open('test_tweets.csv', 'a')

#Use csv writer
csvWriter = csv.DictWriter(
    csvFile, fieldnames=["created_at", "tweet_text", "sentiment", "typeofsentiment"])
csvWriter.writeheader()

csvWriter2 = csv.DictWriter(
    csvTestFile, fieldnames=["created_at", "tweet_text"])
csvWriter2.writeheader()

tweets = tweepy.Cursor(api.search, q=words, tweet_mode='extended', count=1000)
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

analyser = SentimentIntensityAnalyzer()

for tweet in tweets.items(1000):
    print(tweet)
    if tweet.lang == "en":
        print(count)

        # Sentiment analyzing
        tweet_analyze = analyser.polarity_scores(tweet.full_text)

        # Removing punctuation
        tweet.full_text = form_sentence(tweet.full_text)

        # Removing stopwords: is, are, have - increases efficiency
        tweet.full_text = no_user_alpha(tweet.full_text)

        # Normalizing
        tweet.full_text = normalization(tweet.full_text)

        # Determine if a tweet is negative, positive or neutral: -1, 1, 0
        sentiment = 0
        typeofsentiment = ""
        compound = tweet_analyze.get("compound")

        if (compound >= 0.05):
            sentiment = 1
            typeofsentiment = 'positive'
        elif (compound <= -0.05):
            sentiment = -1
            typeofsentiment = 'negative'
        else:
            sentiment = 0
            typeofsentiment = 'neutral'
        
        # Write a row to the CSV file
        # Cols: Created At, Tweets Array, Positive/Negative/Neutral (1,-1,0)
        csvWriter.writerow({'created_at': tweet.created_at, 'tweet_text': tweet.full_text, 'sentiment': sentiment, 'typeofsentiment': typeofsentiment})
        print("Tweet", tweet.created_at, tweet.full_text, sentiment)

        count = count + 1

csvFile.close()

for tweet in tweets.items(1000):
    if tweet.lang == "en":
        print(count)

        # Removing punctuation
        tweet.full_text = form_sentence(tweet.full_text)

        # Removing stopwords: is, are, have - increases efficiency
        tweet.full_text = no_user_alpha(tweet.full_text)

        # Normalizing
        tweet.full_text = normalization(tweet.full_text)

        # Write a row to the CSV file. I use encode UTF-8
        # Cols: Created At, Tweets Array, Positive/Negative
        csvWriter2.writerow({'created_at': tweet.created_at, 'tweet_text': tweet.full_text})
        print("Tweet", tweet.created_at, tweet.full_text)
        count = count + 1

csvTestFile.close()

# ---------------------------------------------------------------------------------------------------------------------
# Twitter API development use pagination for Iterating through timelines, user lists, direct messages, etc.
# To help make pagination easier and Tweepy has the Cursor object.