from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from serializers import PItemSerializer, RecipeSerializer
# Create your views here.


class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes


class GetPItemsView(generics.ListCreateAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(PItem.user = curUser)
        return pItems


class PItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(PItem.user = curUser)
        return pItems
