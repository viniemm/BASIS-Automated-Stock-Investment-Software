from web_dashboard_api.base_architecture_components.filterenums import Operator


class BaseOperatorsAvailable:
    def get_operators_available(self):
        pass


class LogicOperatorsAvailable(BaseOperatorsAvailable):
    def get_operators_available(self):
        return Operator.eq, Operator.neq


class IntegerOperatorsAvailable(BaseOperatorsAvailable):
    def get_operators_available(self):
        return Operator.eq, Operator.neq, Operator.gt, Operator.gte, Operator.lt, Operator.lte, Operator.range


class DateOperatorsAvailable(BaseOperatorsAvailable):
    def get_operators_available(self):
        return Operator.gte, Operator.lte, Operator.range


class TextOperatorsAvailable(BaseOperatorsAvailable):
    def get_operators_available(self):
        return Operator.eq, Operator.neq, Operator.contains, Operator.startswith


class CategoryOperatorsAvailable(BaseOperatorsAvailable):
    def get_operators_available(self):
        return Operator.eq, Operator.neq, Operator.contains
