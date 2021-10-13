from flask import Flask, request, jsonify
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
import numpy as np

import ml

app = Flask(__name__, static_folder='front-end/build', static_url_path='')
CORS(app)

@app.route('/', methods = ['GET'])
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api', methods = ['GET', 'POST'])
@cross_origin()
def index():
    data = request.get_json()
    print(data)
    if data is None:
        return jsonify({
            "dummy": "no json data",
            "errors": ["No JSON data received."]
        })

    ml_computed = ''
    x = np.zeros((1, 7))
    col_schema = ml.get_schema()
    validation_errors = []
    for name in data:
        if name in col_schema:
            datum_min = col_schema[name]['min']
            datum_max = col_schema[name]['max']
            value = data[name]
            if value < datum_min or value > datum_max:
                validation_errors.append(f"Out of bounds: {name}, has value of: {value}, but is expected between {datum_min} and {datum_max}.")
        else:
            validation_errors.append(f"Unexpected field: {name}.")
    for name in data:
        if name not in col_schema:
            validation_errors.append(f"Missing value: {name}")

    if len(validation_errors) < 1:
        x[0, 0] = data['GRE'] # 'GRE Score',
        x[0, 1] = data['TOEFL'] # 'TOEFL Score'
        x[0, 2] = data['Rating'] # 'University Rating'
        x[0, 3] = data['SOP'] # 'SOP'
        x[0, 4] = data['LOR'] # 'LOR '
        x[0, 5] = data['CGPA'] # 'CGPA'
        x[0, 6] = data['Research'] # 'Research'

        ml_computed = ml.try_predict_it(x)
        return jsonify({
            "dummy": "test fine",
            "ml": ml_computed,
            "errors": validation_errors
        })
    
    else:
        return jsonify({
            "dummy": "test server failed",
            "errors": validation_errors
        })

if __name__ == '__main__':
    app.run(debug=True)