import json


# Every complex child class must extend JsonSerialize for this to work
class JsonSerialize:
    def is_jsonable(self, item):
        try:
            json.dumps(item)
            return True
        except:
            return False

    def make_jsonable(self, item):
        if self.is_jsonable(item):
            return item
        else:
            return item.make_jsonable_dict()

    def make_jsonable_dict(self):
        json_dict = {}
        for key in self.__dict__:
            curr_field = getattr(self, key)
            if isinstance(curr_field, list) or isinstance(curr_field, tuple) or isinstance(curr_field, set):
                json_dict[key] = []
                for item in curr_field:
                    json_dict[key].append(self.make_jsonable(item))
            elif isinstance(curr_field, dict):
                json_dict[key] = {}
                for item in curr_field:
                    json_dict[key] = self.make_jsonable(item)
            else:
                json_dict[key] = self.make_jsonable(curr_field)
        return json_dict

    def to_json(self):
        return json.dumps(self.make_jsonable_dict())