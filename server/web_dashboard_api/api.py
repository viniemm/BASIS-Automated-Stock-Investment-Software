from rest_framework import viewsets, permissions
from .serializers import PortfolioSerializer

# Stocks Data "ViewSet"
# allows us to create full CRUD API without explicit definition


class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [
        # only users logged in and registerd can view their portfolios
        permissions.IsAuthenticated
    ]

    serializer_class = PortfolioSerializer

    # override get_queryset method to view only stocks data of current user
    def get_queryset(self):
        return self.request.user.web_dashboard_api.all()

    # automatically set owner of newly created portfolio to user in session
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
