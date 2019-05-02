from django.shortcuts import render
from django.shortcuts import render, render_to_response
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .permissions import *
from .serializers import PItemSerializer, RecipeSerializer, ReceiptSerializer,UPCSerializer
import math, random, string
from .user_updates import updateMatches
from .scraping import *
from datetime import date
from django.http import HttpResponse
from .OCR import UPCCodes
# Create your views here.


# Url name == 'recipe-list'
class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes

    def get_stored_recipes(self):
        recipes = Recipe.objects.all()
        pitems = PItem.objects.all()
        matchingRecipes = []
        for recipe in recipes:
            similar = calc_similarities(recipe.ingredients, pitems)
            if(similar > 0.6):
                matchingRecipes.append(recipe)
        return matchingRecipes

class GetNewRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        try:
            recipe = self.request.data['recipe']
        except KeyError:
            raise KeyError('Request has no recipe query attached')
        scrape_results = scraper(recipe)

        for r in scrape_results:
            try:
                new_recipe = Recipe.objects.get(static_id=r[0])
            except Recipe.DoesNotExist:
                new_recipe = Recipe.objects.create(static_id=r[0], image_url=r[1], recipe_url=r[2], name=r[3], ingredients=r[4])
                new_recipe.save()

        recipes = Recipe.objects.all()
        return recipes

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

class AddPItemsView(generics.CreateAPIView):
    serializer_class = PItemSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def post(self, request):
        try:
            new_pitems = self.request.data['items']
        except KeyError:
            raise KeyError('Request has no \'items\' field attached. Must be an array')

        for item in new_pitems:
            id = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
            pitem = PItem.objects.create(
                static_id=id,
                name=item['name'],
                qty=1,
                exp_date=date.today(),
                user=self.request.user
            )
            pitem.save()
        return Response(f"Added {len(new_pitems)} new items")

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
        UPCCodes(reciept.static_id,self.request.user)
        return Response('Created Receipt {}'.format(reciept.static_id))

class UPCView(generics.ListCreateAPIView):
    serializer_class = UPCSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        recipes = Recipe.objects.all()
        return recipes
