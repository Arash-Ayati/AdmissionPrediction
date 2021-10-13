import pickle
import pandas as pd

Expected = {
    "GRE":{"min":0, "max":1000},
    "TOEFL":{"min":0, "max":1000},
    "Rating":{"min":1, "max":5},
    "SOP":{"min":1, "max":5},
    "LOR":{"min":1, "max":5},
    "CGPA":{"min":1, "max":9},
    "Research":{"min":0, "max":1}
}

# def try_predict_it(user_input = [[324, 107, 4, 4.0, 4.5, 8.87, 1]]):
def try_predict_it(user_input):
    if user_input is not None:
        filename = 'model.saved'
        with open(filename, 'rb') as fid:
            regressor = pickle.load(fid)
        if regressor:
            result = regressor.predict(user_input)
            return result[0]
    else:
        return ''

def get_schema():
    return Expected