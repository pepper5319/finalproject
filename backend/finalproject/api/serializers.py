from rest_framework import serializers
from api.models import PItem, Recipe, Receipt


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('static_id', 'name', 'recipe_url', 'image_url',
                  'ingredients')


class PItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PItem
        fields = ('static_id', 'name', 'date_added', 'qty', 'exp_date', 'user')

class ReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receipt
        fields = ('static_id', 'file', 'date_added', 'user')
