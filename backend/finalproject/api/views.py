from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .permissions import *
from .serializers import PItemSerializer, RecipeSerializer, ReceiptSerializer
import math, random, string
from .user_updates import updateMatches
# Create your views here.


# Url name == 'recipe-list'
class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes

    def get_stored_recipies(self):
        recipes = Recipe.objects.all()
        pitems = PItem.objects.all()
        matchingRecipes = []
        for recipe in recipes:
            similar = calc_similarities(recipe.ingredients, pitems)
            if(similar > 0.6):
                matchingRecipes.append(recipe)
        return matchingRecipes

# Url name == 'recipe-detail'
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes


# Url name == 'pItem-list'
class GetPItemsView(generics.ListCreateAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated, IsPItemAllowed,)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(user = curUser)
        return pItems


# Url name == 'pItem-detail'
class PItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated, IsPItemAllowed,)

    def get_queryset(self):
        curUser = self.request.user
        pItems = PItem.objects.filter(user = curUser)
        return pItems

class ReceiptsView(generics.ListCreateAPIView):
    serializer_class = ReceiptSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        recipes = Receipt.objects.all()
        return recipes

    def post(self, request):
        try:
            file = self.request.data['file']
        except KeyError:
            raise KeyError('Request has no resource file attached')
        x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
        reciept = Receipt.objects.create(image=file, static_id=x, user=request.user)
        reciept.save()
        recipes = Recipe.objects.all()
        pitems = PItem.objects.filter(user=self.request.user)

        updateMatches(self.request.user, recipes, 0.75, pitems)

        return Response('Created Receipt {}'.format(reciept.static_id))
