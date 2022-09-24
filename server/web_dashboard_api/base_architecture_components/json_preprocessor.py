import json


class JsonPreprocessor:
    @staticmethod
    def request_to_json_dict(request):
        json_string = request.body.decode("utf-8")
        json_string = json_string.replace("\n", "")
        json_string = json_string.replace("\r", "")
        json_string = json_string.replace(" ", "")
        print(json_string)
        return json.loads(json_string)
