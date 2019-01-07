from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
# Create your views here.

class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes
