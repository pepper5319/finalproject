from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .permissions import *
from .serializers import PItemSerializer, RecipeSerializer, ReceiptSerializer
import math
# Create your views here.



def updateMatches(user, recipes, thresh):
    '''
    user: PUser, object
    recipes: Recipe, list
    thresh: float
    '''
    matches = []
    pItems = PItem.objects.filter(user=user)
    for r in recipes:
        sim = calc_similarities(r.ingredients.split(','), pItems)
        if(sim > thresh):
            matches.append(r.static_id)
    user.matches = matches
    user.save()

def calc_similarities(l1, l2):
    sum = 0
    for ing in l1:
        for item in l2:
            short = item if len(item) < len(ing) else ing
            long = item if len(item) >= len(ing) else ing
            if short in long:
                sum += 1
    return sum/len(l1)

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
        reciept = Receipt.objects.create(image=file, static_id="fghjfgjghj", user=request.user)
        reciept.save()
        return Response('Created Receipt {}'.format(reciept.static_id))
