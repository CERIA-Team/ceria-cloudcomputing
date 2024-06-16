from flask import Flask, request, jsonify
import routes.routes as routes
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
routes.configure_routes(app)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
