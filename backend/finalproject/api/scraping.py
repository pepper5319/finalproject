import requests
import json
from .ingredient_parsing import search_dict, plural_to_singular
from bs4 import BeautifulSoup
import os.path
BASE = os.path.dirname(os.path.abspath(__file__))

def scraper(str_in):
    '''
    Scrapes recipes based on passed in string keyword
    Returns a list of recipe list objects
    '''
    final_recipe_list = []
    id_image_url = scrape_recipes(str_in=str_in)
    for recipe_list in id_image_url:
        recipe_list = scrape_ingredients(recipe_list)
        final_recipe_list.append(recipe_list)
    return final_recipe_list

def scrape_recipes(str_in):
    '''
    Gets Recipe URLs and Image URLs
    '''
    data = requests.get(f'https://www.allrecipes.com/search/results/?wt={str_in}&sort=re')
    soup = BeautifulSoup(''.join(str(data.content)), features="html.parser")
    url_duplicate_check = []
    id_image_url = []
    results = soup.body.find(attrs={'id' : 'fixedGridSection'})
    if(results != None):
        soup2 = BeautifulSoup(''.join(str(results)), features="html.parser")
        for tag in soup2.findAll('ar-save-item')[:5]:
            if('/userphotos/' in tag['data-imageurl']):
                # temp = [tag['data-id']]
                # temp.append(str(tag['data-imageurl']).replace('\\','').replace("'",''))
                id_image_url.append([tag['data-id'], str(tag['data-imageurl']).replace('\\','').replace("'",''),])
                # id_image_url.append({tag['data-id'] : [str(tag['data-imageurl']).replace('\\','').replace("'",''),]})
        for tag in soup2.findAll('a'):
            if('/recipe/' in tag['href'] and tag['href'] not in url_duplicate_check):
                url_duplicate_check.append(tag['href'])
                for val in id_image_url:
                    if val[0] in tag['href']:
                        val.append(tag['href'])
                    # the inner loop should only run once
                    # for key, value in val.items():
                    #     if key in tag['href']:
                    #         val[key].append(tag['href'])
    return id_image_url

def scrape_ingredients(recipe_list_obj):
    '''Takes in a recipe list object in this format:
    [static_id, image_url, recipe_url]

    Returns a recipe list object in this format:
    [static_id, image_url, recipe_url, recipe_name, ingredient_list]

    ingredient_list is a list of ingredient strings
    '''
    cooking_keywords = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup',
                        'cups', 'pint', 'pints', 'ounce', 'ounces', 'pound',
                        'pounds', 'dash', 'pinch', 'quart', 'quarts',
                        'gallon', 'gallons', 'fresh']

    cooking_keyword_abbrv = ['t', 'tsp', 'T', 'Tsbp', 'c', 'oz', 'pt', 'qt', 'gal',
                             'lb', '#']
    dont_include_list = ['and', 'whole', 'condensed', 'hot', 'cold']
    ingredient_list = []
    ingredient_dict = {}
    data = requests.get(recipe_list_obj[-1])
    soup = BeautifulSoup(''.join(str(data.content)), features="html.parser")
    soup2 = soup
    results = soup.body.findAll(attrs={'itemprop' : 'recipeIngredient'})
    recipe_name = str(soup2.head.title.string).replace('Recipe - Allrecipes.com', '').replace('\\', '').strip()
    recipe_list_obj.append(recipe_name)
    with open(os.path.join(BASE, 'ingredients.json')) as file:
        ingredient_dict = json.load(file)

    for ingredient in results:
        str_ingredient = str(ingredient.string)
        str_ingredient = str_ingredient.replace(',', '')
        arr = []
        arr = str_ingredient.split()
        final_ingredient = ''
        for val in arr:
            if val.isalpha() == True:
                if val == 'or':
                    break
                if str(val) not in cooking_keywords and str(val) not in cooking_keyword_abbrv:
                    final_ingredient += plural_to_singular(val) + ' '
        final_ingredient = search_dict(input_dict=ingredient_dict, search_term=final_ingredient.strip().lower())
        if final_ingredient is not None:
            if final_ingredient not in dont_include_list:
                if final_ingredient not in ingredient_list:
                    ingredient_list.append(final_ingredient.strip())
    recipe_list_obj.append(ingredient_list)
    return recipe_list_obj
