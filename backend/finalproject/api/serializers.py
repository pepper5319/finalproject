from rest_framework import serializers
from api.models import PItem, Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('static_id', 'name', 'description', 'image_url',
                  'ingredients')


class PItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PItem
        fields = ('static_id', 'name', 'date_added', 'qty', 'exp_date', 'user')
