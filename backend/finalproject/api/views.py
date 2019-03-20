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
from .user_updates import calc_similarities, updateMatches
from .ingredient_parsing import search_dict
import collections
import json
# Create your views here.


# Url name == 'recipe-list'
class GetRecipesView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def get_queryset(self):
    #     user = self.request.user
    #     recipes = Recipe.objects.all()
    #     return recipes

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        pitems = PItem.objects.filter(user=user)
        dict = {}

        for recipe in recipes:
            similar = int(calc_similarities(recipe.ingredients, pitems) * 1000)
            if similar not in dict.keys():
                dict[similar] = []
            dict[similar].append(recipe)

        ordered_keys = sorted(dict.keys(), reverse=True)

        recipes = []
        for key in ordered_keys:
            for recipe in dict[key]:
                recipes.append(recipe)

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

        recipes = []

        for r in scrape_results:
            try:
                new_recipe = Recipe.objects.get(static_id=r[0])
            except Recipe.DoesNotExist:
                new_recipe = Recipe.objects.create(static_id=r[0], image_url=r[1], recipe_url=r[2], name=r[3], ingredients=r[4])
                new_recipe.save()
                recipes.append(new_recipe)

        return recipes

# Url name == 'recipe-detail'
class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RecipeSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        recipes = Recipe.objects.all()
        return recipes

    def retrieve(self, request, pk=None):
        user = self.request.user
        recipe = Recipe.objects.get(pk=pk)
        # recipe = Recipe.object.get_object(pk=pk)
        serializer = RecipeSerializer(recipe)
        dict = {}
        dict['recipe'] = serializer.data
        ingredients_str = serializer.data['ingredients']
        recipe_ingredients = ingredients_str.replace('[', '').replace(']', '').replace("'", '').split(', ')

        pItems = PItem.objects.filter(user=user)
        itemSerializer = PItemSerializer(pItems, many=True)
        pItems_list = []
        saved_ingredients = []
        for val in itemSerializer.data:
            saved_ingredients.append(str(val['name']))

        for ingredient in recipe_ingredients:
            if ingredient in saved_ingredients:
                pItems_list.append(ingredient)

        dict['matches'] = pItems_list

        return Response(dict)

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

        ingredient_dict = {}
        with open(os.path.join(BASE, 'ingredients.json')) as file:
            ingredient_dict = json.load(file)

        for item in new_pitems:
            id = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))
            item['name'] = search_dict(input_dict=ingredient_dict, search_term=item['name'].lower())
            if item['name'] is not None:
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
        UPCCodes(reciept.static_id)
        return Response('Created Receipt {}'.format(reciept.static_id))

class UPCView(generics.ListCreateAPIView):
    serializer_class = UPCSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        recipes = Recipe.objects.all()
        return recipes
