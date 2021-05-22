from django.urls import path
from accounts.views import current_user, UserList, UserAPI

urlpatterns = [
    path('current/', current_user, name="current"),
    path('', UserList.as_view()),
    path('',UserAPI.as_view())
]
