import numpy as nd
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import confusion_matrix, classification_report,accuracy_score, f1_score
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split

# MACHINE LEARNING - TRAINING & ANALYSIS
train_tweets_csv = pd.read_csv('../../tweets.csv')
test_tweets_csv = pd.read_csv('../../test_tweets.csv')
train_tweets_csv.head()

train_tweets = train_tweets_csv[['tweet_text', 'sentiment', 'typeofsentiment']]
test_tweets = test_tweets_csv[['tweet_text']]

train_tweets['length'] = train_tweets['tweet_text'].apply(len)
temp = train_tweets['typeofsentiment']

# MACHINE LEARNING - MODEL SELECTION
X = train_tweets['tweet_text']
y = train_tweets['sentiment']

test = test_tweets[['tweet_text']]

# MACHINE LEARNING - SVM TRAINING
tw_train, tw_test, label_train, label_test = train_test_split(X, y, test_size = 0.2, random_state = 0, shuffle = True)

pipe = Pipeline([
    ('vector', CountVectorizer()),
    ('tfidf', TfidfTransformer()),
    ('svm', LinearSVC(max_iter=100, 
                        C=2.0
                    ))
])

pipe.fit(tw_train, label_train)

# PREDICTION - SVM
svm_predictions = pipe.predict(tw_test)
classification_result = classification_report(svm_predictions,label_test)
accuracy = accuracy_score(label_test, svm_predictions)

# NAIVE BAYES - TRAINING
pipe2 = Pipeline([
    ('vector', CountVectorizer()),
    ('tfidf', TfidfTransformer()),
    ('classifier', MultinomialNB(alpha=2.1))
])

pipe2.fit(tw_train, label_train)

# NAIVE BAYES - PREDICTION
nb_predictions = pipe2.predict(tw_test)

classification_result = classification_report(nb_predictions,label_test)
accuracy = accuracy_score(label_test, nb_predictions)

def get_SVM_sentiment(tweet):
    svm_pred = pipe.predict(tweet)
    return svm_pred

def get_NB_sentiment(tweet):
    nb_pred = pipe2.predict(tweet)
    return nb_pred