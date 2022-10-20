from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
    path('api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(),
         name='knox_logout')  # imported logout behavior
]


# knox_logout invalidates the token for the session,
# making them unable to access their resources
# requiring the user to login again with username and password
# to generate a new token for the session
