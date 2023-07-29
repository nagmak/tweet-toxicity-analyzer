from flask import Flask, request, jsonify
import nltk
from flask_cors import CORS, cross_origin
import algorithms

# Sentiment analyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'OPTIONS'])
@cross_origin(origin='*')

def get_sentiment():
    algorithm = request.args.get('algorithm')
    tweet = request.args.get('tweet')
    print(tweet)
    print(algorithm)
    finalAlgo = determine_algorithm(tweet, algorithm)
    # finalAlgo.headers.add('Access-Control-Allow-Origin', '*')
    return finalAlgo

def determine_algorithm(tweet, algorithm):
    if algorithm == 'vader':
        analyser = SentimentIntensityAnalyzer()
        tweet_analyze = analyser.polarity_scores(tweet)
        return jsonify(tweet_analyze)
    elif algorithm == 'svm':
        tweet = [tweet]
        result = algorithms.get_SVM_sentiment(tweet)
        result = result.tolist()
        return jsonify(result)
    elif algorithm == 'nb':
        tweet = [tweet]
        result = algorithms.get_NB_sentiment(tweet)
        result = result.tolist()
        return jsonify(result)

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="localhost", port=3100, debug=True)