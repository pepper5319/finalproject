from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .permissions import *
from serializers import PItemSerializer, RecipeSerializer
# Create your views here.


# Url name == 'recipe-list'
class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes


# Url name == 'recipe-detail'
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes


# Url name == 'pItem-list'
class GetPItemsView(generics.ListCreateAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated, IsPItemAllowed)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(PItem.user = curUser)
        return pItems


# Url name == 'pItem-detail'
class PItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated, IsPItemAllowed)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(PItem.user = curUser)
        return pItems
