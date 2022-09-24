from datetime import datetime, timedelta

import pytz

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel

# TODO: fix this one
class IndicatorsDerivedModel(BaseDerivedModel):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.lamp_id = None
        self.device_type = None
        self.part_number = None
        self.initial_start = None
        self.attempt_duration = None
        self.attempt_number = None
        self.attempt_start = None
        self.current_seconds = None
        for key, value in kwargs.items():
            setattr(self, key, value)
        # Get filter_derived properties
        self.seconds_left = None
        if self.attempt_duration is not None and self.attempt_duration != -1 and self.current_seconds is not None:
            self.seconds_left = self.attempt_duration - self.current_seconds
        self.finish_at = None
        if self.seconds_left is not None:
            self.finish_at = datetime.now(pytz.timezone('America/Chicago')) + timedelta(seconds=self.seconds_left)
            self.finish_at = self.finish_at.replace(tzinfo=pytz.utc)
        self.current_hours = None
        if self.current_seconds is not None:
            self.current_hours = self.current_seconds // 3600
        self.hours_left = None
        if self.seconds_left is not None:
            self.hours_left = self.seconds_left // 3600
        self.part_number_label = None
        self.device_type_label = None
        if self.device_type:
            self.device_type_label = self.device_type
            if "LowProfileLinear" in self.device_type:
                self.device_type_label = "KitKat"
