from django.test import TestCase
from .ingredient_parsing import search_dict
import json

# Create your tests here.
class IngredientTestCases(TestCase):
    def setUp(self):
        self.dict = {}
        with open('api//ingredients.json') as file:
            self.dict = json.load(file)

    def test_ingredient_search(self):
        self.assertEqual(search_dict(self.dict, 'boneless skinless chicken breast halves'), 'chicken breast')
        self.assertEqual(search_dict(self.dict, 'fresh chicken stock in carton made of the best cardboard ever'), 'chicken stock')
        self.assertEqual(search_dict(self.dict, 'virgin olive oil'), 'olive oil')
        self.assertEqual(search_dict(self.dict, 'Goya black bean'), 'black bean')
        self.assertEqual(search_dict(self.dict, 'Tijuana Flats pinto bean but how'), 'pinto bean')
