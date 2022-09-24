

class BaseGranularityParser:
    def parse_granularity(self, granularity):
        return granularity


class CategoryGranularityParser(BaseGranularityParser):
    def parse_granularity(self, granularity):
        return granularity


class IntegerGranularityParser(BaseGranularityParser):
    def parse_granularity(self, granularity):
        return int(granularity)


class FloatGranularityParser(BaseGranularityParser):
    def parse_granularity(self, granularity):
        return float(granularity)


class DateGranularityParser(BaseGranularityParser):
    def parse_granularity(self, granularity):
        return granularity
