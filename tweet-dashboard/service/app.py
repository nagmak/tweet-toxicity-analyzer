from flask import Flask, request, jsonify
import nltk
from flask_cors import CORS, cross_origin

# Sentiment analyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type', 'Access-Control-Allow-Origin'

# @app.route('/tweet', methods=['POST'])
# def update_tweet(tweet, tweet_id):
#   if request.method == 'POST':
#     # Sends tweet to be tested
#     add_tweet(tweet, tweet_id)

@app.route('/', methods=['GET'])
@cross_origin()
def return_sentiment():
    tweet = request.args.get('tweet')
    # if request.method == 'GET':
    #     # retrieves sentiment from vader analysis
    return get_sentiment(tweet)


def get_sentiment(tweet):
    analyser = SentimentIntensityAnalyzer()
    tweet_analyze = analyser.polarity_scores(tweet)
    return jsonify(tweet_analyze)

if __name__ == '__main__':
    app.run(debug=True)