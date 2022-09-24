from rest_framework import serializers
from .models import Burnintime

class BurnintimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Burnintime
        fields = ('lamp',
                  'status',
                  'initial_start',
                  'current_session_id',
                  'attempt_duration',
                  'attempt',
                  'attempt_start',
                  'last_seconds',
                  'current_seconds',
                  'total_seconds',
                  'last_update',
                  'notes'
                  )