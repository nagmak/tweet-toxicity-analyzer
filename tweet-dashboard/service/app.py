from flask import Flask, request, jsonify
import nltk
from flask_cors import CORS, cross_origin
import algorithms

# Sentiment analyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type', 'Access-Control-Allow-Origin'

@app.route('/', methods=['GET'])
@cross_origin()
def get_sentiment():
    algorithm = request.args.get('algorithm')
    tweet = request.args.get('tweet')
    print(tweet)
    print(algorithm)
    return determine_algorithm(tweet, algorithm)

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
    app.run(debug=True)