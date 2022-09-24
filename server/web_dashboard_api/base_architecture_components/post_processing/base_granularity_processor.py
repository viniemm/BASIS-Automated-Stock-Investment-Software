from datetime import timedelta, datetime

import pytz

from web_dashboard_api.base_architecture_components.filterenums import Granularity


class BaseGranularityProcessor:
    def get_all_buckets(self, values, granularity):
        pass

    def get_granularity_bucket(self, value, granularity):
        pass 
    
    
class CategoryGranularityProcessor(BaseGranularityProcessor):
    def get_all_buckets(self, values, granularity):
        return values

    def get_granularity_bucket(self, value, granularity):
        return value 
    

class IntegerGranularityProcessor(BaseGranularityProcessor):
    def get_all_buckets(self, values, granularity):
        if len(values) > 0:
            max_num = self.get_granularity_bucket(max(values), granularity)
            min_num = self.get_granularity_bucket(min(values), granularity)
            return list(range(min_num, max_num + 1, granularity))
        else:
            return []

    def get_granularity_bucket(self, value, granularity):
        return round(value / granularity) * granularity


class FloatGranularityProcessor(BaseGranularityProcessor):
    def get_all_buckets(self, values, granularity):
        if len(values) > 0:
            max_num = self.get_granularity_bucket(max(values), granularity)
            min_num = self.get_granularity_bucket(min(values), granularity)
            return [min_num + granularity*i for i in range(int((max_num-min_num)//granularity))]
            # return list(range(min_num, max_num + 1, granularity))
        else:
            return []

    def get_granularity_bucket(self, value, granularity):
        return round(value / granularity) * granularity
    

class DateGranularityProcessor(BaseGranularityProcessor):
    def apply_granularity(self, value, granularity):
        match granularity:
            case 'half_hour':
                minutes = (value.minute // 30) * 30
                value = value.replace(second=0, minute=minutes)
            case 'hour':
                value = value.replace(second=0, minute=0)
            case 'three_hour':
                hours = (value.hour // 3) * 3
                value = value.replace(second=0, minute=0, hour=hours)
            case 'day':
                value = value.replace(second=0, minute=0, hour=0)
        return value

    def date_to_str(self, value, granularity):
        json_dump = value.strftime("%#m/%#d %#I %p")
        match granularity:
            case 'half_hour':
                json_dump = value.strftime("%#m/%#d %#I:%M %p")
            case 'hour':
                json_dump = value.strftime("%#m/%#d %#I %p")
            case 'three_hour':
                json_dump = value.strftime("%#m/%#d %#I %p")
            case 'day':
                json_dump = value.strftime("%#m/%#d")
        return json_dump.replace("\"", "")

    def get_all_buckets(self, values, granularity):
        if granularity == Granularity.shift:
            return ShiftGranularityProcessor().get_all_buckets(values, granularity)
        max_date = self.apply_granularity(max(values), granularity)
        min_date = self.apply_granularity(min(values), granularity)
        curr_date = min_date
        result = []
        while curr_date <= max_date:
            result.append(self.date_to_str(curr_date, granularity))
            delta = timedelta()
            match granularity:
                case Granularity.half_hour:
                    delta = timedelta(minutes=30)
                case Granularity.hour:
                    delta = timedelta(hours=1)
                case Granularity.three_hour:
                    delta = timedelta(hours=3)
                case Granularity.day:
                    delta = timedelta(days=1)
            curr_date += delta
        return result

    def get_granularity_bucket(self, value, granularity):
        if granularity == Granularity.shift:
            return ShiftGranularityProcessor().get_granularity_bucket(value, granularity)
        value = self.apply_granularity(value, granularity)
        return self.date_to_str(value, granularity)


class ShiftGranularityProcessor(BaseGranularityProcessor):
    def date_to_str(self, value):
        json_dump = value.strftime("%#m/%#d")
        return json_dump.replace("\"", "")

    def apply_granularity(self, value, granularity):
        current_h = value.hour
        if 7 <= current_h < 15:
            return "First " + self.date_to_str(value)
        if 15 <= current_h < 23:
            return "Second " + self.date_to_str(value)
        else:
            if current_h < 23:
                value = value - timedelta(days=1)
            return "Third " + self.date_to_str(value)

    def get_all_buckets(self, values, granularity):
        max_date = max(values)
        min_date = min(values)
        curr_date = min_date
        result = []
        while curr_date <= max_date:
            result.append(self.apply_granularity(curr_date, granularity))
            delta = timedelta(hours=8)
            curr_date += delta
        return result

    def get_granularity_bucket(self, value, granularity):
        return self.apply_granularity(value, granularity)


class FinishesAtDateGranularityProcessor(DateGranularityProcessor):
    now = None

    def get_now(self):
        if self.now is None:
            self.now = datetime.now(pytz.timezone('America/Chicago')) - timedelta(minutes=1)
            self.now = self.now.replace(tzinfo=pytz.utc)
        return self.now

    def get_all_buckets(self, values, granularity):
        if granularity == Granularity.shift:
            return FinishesAtShiftGranularityProcessor().get_all_buckets(values, granularity)
        max_date = max(values) if len(values) > 0 else self.get_now()
        max_date = max_date if max_date >= self.get_now() else self.get_now()
        min_date = self.get_now()
        result = []
        if len(values) > 0 and min(values) < self.get_now():
            result.append('Overdue')
        result.extend(super().get_all_buckets([min_date, max_date], granularity))
        return result

    def get_granularity_bucket(self, value, granularity):
        if granularity == Granularity.shift:
            return FinishesAtShiftGranularityProcessor().get_granularity_bucket(value, granularity)
        if value < self.get_now():
            return 'Overdue'
        return super().get_granularity_bucket(value, granularity)


class FinishesAtShiftGranularityProcessor(ShiftGranularityProcessor):
    now = None

    def get_now(self):
        if self.now is None:
            self.now = datetime.now(pytz.timezone('America/Chicago')) - timedelta(minutes=1)
            self.now = self.now.replace(tzinfo=pytz.utc)
        return self.now

    def apply_granularity(self, value, granularity):
        if value < self.get_now():
            return 'Overdue'
        return super().apply_granularity(value, granularity)

    def get_all_buckets(self, values, granularity):
        max_date = max(values) if len(values) > 0 else self.get_now()
        max_date = max_date if max_date >= self.get_now() else self.get_now()
        min_date = self.get_now()
        result = []
        if len(values) > 0 and min(values) < self.get_now():
            result.append('Overdue')
        result.extend(super().get_all_buckets([min_date, max_date], granularity))
        return result
