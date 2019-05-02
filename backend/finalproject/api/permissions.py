from rest_framework.permissions import BasePermission, AllowAny
from .models import PItem, Recipe

class IsPItemAllowed(BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, PItem):
            return obj.user == request.user
        return obj.user == request.user
