import requests
import json
from .ingredient_parsing import search_dict
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
                    final_ingredient += val + ' '
        final_ingredient = search_dict(input_dict=ingredient_dict, search_term=final_ingredient.strip().lower())
        if final_ingredient is not None:
            if final_ingredient in dont_include_list:
                if final_ingredient not in ingredient_list:
                    ingredient_list.append(final_ingredient)
    recipe_list_obj.append(ingredient_list)
    return recipe_list_obj

# def scrape_ingredients(recipe_list):
#     cooking_keywords = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup',
#                         'cups', 'pint', 'pints', 'ounce', 'ounces', 'pound',
#                         'pounds', 'dash', 'pinch', 'quart', 'quarts',
#                         'gallon', 'gallons', 'fresh']
#
#     cooking_keyword_abbrv = ['t', 'tsp', 'T', 'Tsbp', 'c', 'oz', 'pt', 'qt', 'gal',
#                              'lb', '#']
#     with open('recipe2.html', 'w') as file:
#         # for val in recipe_list:
#             # for str_term in val:
#                 # file.write(str(str_term) + ', ')
#             # data = requests.get(val[-1])
#         data = requests.get("https://www.allrecipes.com/recipe/23874/catherines-spicy-chicken-soup/?clickId=right%20rail0&internalSource=rr_feed_recipe_sb&referringId=223042%20referringContentType%3Drecipe")
#         file.write(str(data.content))
#         soup = BeautifulSoup(''.join(str(data.content)), features="html.parser")
#         ingredient_list = []
#         results = soup.body.findAll(attrs={'itemprop' : 'recipeIngredient'})
#         results2 = str(soup.head.title.string).replace('Recipe - Allrecipes.com', '').replace('\\', '').strip()
#         print(str(results2))
#         # with open('recipe.html', 'w') as file:
#
#         for ingredient in results:
#             str_ingredient = str(ingredient.string)
#             str_ingredient = str_ingredient.replace(',', '')
#             arr = []
#             arr = str_ingredient.split()
#             final_ingredient = ''
#             for val in arr:
#                 if val.isalpha() == True:
#                     if val == 'or':
#                         break
#                     if str(val) not in cooking_keywords and str(val) not in cooking_keyword_abbrv:
#                         final_ingredient += val + ' '
#
#             ingredient_list.append(final_ingredient.strip().lower())

            # for str_ingredient in ingredient_list:
            #     file.write(str(str_ingredient) + ', ')
            # file.write('\n')

# scraper('chicken')

# scrape_ingredients(scrape_recipes('chicken'))
# with open("ingredients.txt") as file:
#     for val in ingredient_list:
#         file.write(val)


# print(id_image_url)
# with open("urls.txt", "a") as file:
#     for val in id_image_url:
#         for key, value in val.items():
#             file.write(key + ',')
#             for url in value:
#                 file.write(url + ',')
#         file.write('\n')
#
#
# # Gets ingredients out of recipes
# data = requests.get("https://www.allrecipes.com/recipe/223042/chicken-parmesan/?internalSource=hub%20recipe&referringContentType=Search")
# # data = requests.get("https://www.allrecipes.com/")
# data = str(data.content).replace('\\r', '').replace("\\'", "'").replace('\\n', '')
#
# # cooking_keywords = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup',
# #                     'cups', 'pint', 'pints', 'ounce', 'ounces', 'pound',
# #                     'pounds', 'dash', 'pinch', 'quart', 'quarts',
# #                     'gallon', 'gallons', 'or', 'more', 'if', 'needed', 'as',
# #                     'cut', 'into', 'small', 'cubes', 'for', 'frying', 'to',
# #                     'taste']
#
# cooking_keywords = ['teaspoon', 'teaspoons', 'tablespoon', 'tablespoons', 'cup',
#                     'cups', 'pint', 'pints', 'ounce', 'ounces', 'pound',
#                     'pounds', 'dash', 'pinch', 'quart', 'quarts',
#                     'gallon', 'gallons', 'fresh']
#
# cooking_keyword_abbrv = ['t', 'tsp', 'T', 'Tsbp', 'c', 'oz', 'pt', 'qt', 'gal',
#                          'lb', '#']
#
# soup = BeautifulSoup(''.join(data), features="html.parser")
#
# with open("recipe2.html", "w") as file:
#     file.write(str(data))
#
# ingredient_list = []
#
# with open("recipe3.html", "w") as file:
#     results = soup.body.findAll(attrs={'itemprop' : 'recipeIngredient'})
#     for ingredient in results:
#         str_ingredient = str(ingredient.string)
#         str_ingredient = str_ingredient.replace(',', '')
#         arr = []
#         arr = str_ingredient.split()
#         final_ingredient = ''
#         for val in arr:
#             if val.isalpha() == True:
#                 if val == 'or':
#                     break
#                 if str(val) not in cooking_keywords and str(val) not in cooking_keyword_abbrv:
#                     final_ingredient += val + ' '
#
#         ingredient_list.append(final_ingredient.strip())
#         # print(final_ingredient.strip())
#         file.write(final_ingredient.strip() + ',')
#
# ht = {}
# file = open("ingredient_dicitonary.txt", 'r')
# saved_ingredients = []
# for line in file:
#     saved_ingredients.append(line.replace('\n', '').strip().lower())
#     # hash_insert(ht, line.replace('\n', ''))
#
# print("--------Ingredients--------")
# print(ingredient_list)
# print("----------------")
#
# ingredients_to_check = ['skinless boneless chicken breasts halves', 'salt and freshly ground black pepper to taste', 'eggs', 'panko bread crumbs', 'grated Parmesan cheese', 'flour', 'fresh olive oil for frying', 'prepared tomato sauce', 'mozzarella cut into small cubes', 'chopped basil', 'grated provolone cheese', 'grated Parmesan cheese', 'olive oil']
# # saved_ingredients = ['chicken breast', 'salt', 'eggs', 'bread crumbs', 'parmesan cheese', 'flour', 'olive oil', 'tomato sauce', 'mozzarella', 'basil']
# # for temp in saved_ingredients:
# # print(compare_string(saved='chicken breast', str='skinless boneless chicken breast halves'))
#
# for check in ingredients_to_check:
#     for saved_word in saved_ingredients:
#         res = compare_string(check.lower(),  saved_word)
#         if res is not None:
#             print(res)
#
#
# # Hash table, currently unused
# from ingredient_parsing import compare_string
#
# def hash_function(key):
#     return (ord(key.lower()[0]) - 97)
#
#
# def hash_insert(hash_table, val):
#     hash_key = hash_function(val)
#     if hash_key not in hash_table:
#         hash_table[hash_key] = [val.lower()]
#     else:
#         if val not in hash_table[hash_key]:
#             hash_table[hash_key].append(val.lower())
#     return hash_key
#
#
# def hash_find(hash_table, val):
#     hash_key = hash_function(val)
#     print("Val = " + str(val) + " | Hash_Key = " + str(hash_key))
#     if hash_key in hash_table:
#         for saved_word in hash_table[hash_key]:
#             return compare_string(val.lower(), saved_word)
#     return None
#
#
# # ht = {}
# # file = open("ingredient_dicitonary.txt", 'r')
# #
# # for line in file:
# #     hash_insert(ht, line.replace('\n', ''))
# #
# # str_test = "skinless boneless chicken breast halves"
# # list_test = str_test.split()
# #
# # for word in list_test:
# #     if hash_find(ht, word) is True:
# #         print(word)
#
#
# # Handles abbreviations
# import enchant
# import nltk
#
# from nltk.corpus import wordnet as wn
#
#
# # food = wn.synset('food.n.02')
# # words = list(set([w for s in food.closure(lambda s:s.hyponyms()) for w in s.lemma_names()]))
# # words.sort()
# # with open("test_words.txt", "w") as file:
# #     for word in words:
# #         word = word.replace('_', ' ')
# #         file.write(word + '\n')
#
#
# wordDict = enchant.request_pwl_dict("test_words.txt")
#
# inputWords = ['bnless', 'bred', 'chkn', 'chddr', 'cinnmon', 'pialsdkfjalskdjfkljazza', 'leg of lamb']
#
# for word in inputWords:
#     wlist = wordDict.suggest(word)
#     if len(wlist) == 0:
#         print ('New Item: ' + word)
#     else:
#         print(wlist)

# import requests
# from bs4 import BeautifulSoup
# data = requests.get("https://en.wikibooks.org/w/index.php?title=Category:Ingredients&pagefrom=Vegemite%0AVegemite#mw-pages")
#
# data = str(data.content).replace('\r\n', '').replace("\'", "'").replace('\n', '')
#
# soup = BeautifulSoup(''.join(data), features="html.parser")
#
# arr = []
# str_ing = ''
# results = soup.body
# # Gets Recipe URLs and Image URLs
# with open("results.html", "w") as file:
#     file.write(str(results))
#
# with open('ingredients.txt', 'a', encoding='utf8') as file:
#     for tag in results.findAll('a'):
#         try:
#             if 'Cookbook:' in tag['title']:
#                 temp = str(tag['title'].lower().replace('cookbook:', '').replace('cooking', '').replace('with', '') + ',').strip()
#                 if temp not in arr:
#                     arr.append(temp)
#                 # arr += str(tag['title'].lower().replace('cookbook:', '').replace('cooking', '').replace('with', '') + ',')
#         except KeyError:
#             pass
#     print(arr)
#     for word in arr:
#         str_ing += word
#     file.write(str_ing)
# tempstr = ''
# with open('ingredients.txt', 'r', encoding='utf8') as file:
#     tempstr = file.read()
#     print(tempstr)

# import json
#
# term_list = []
# with open('ingredients.txt', 'r') as file:
#     term_list = file.read().split(',')
# dict = {}
# for term in term_list:
#     word_list = term.split()
#     prev = None
#     for word in word_list:
#         if word not in dict.keys():
#             dict[word] = []
#         if prev is not None:
#             dict[prev].append(word)
#         prev = word
#
# test_str = "skinless chicken breast halves"
# test_split = test_str.split()

# def search_dict(input_dict, search_term):
#     ret_str = ''
#     search_split = search_term.split()
#     for index, val in enumerate(search_split):
#         ret_str = ''
#         if val is in input_dict.keys():
#             ret_str += val
#             for i in range(index, len(search_split)):
#                 if search_split[i] in input_dict[val]:
#                     ret_str += search_split[i]
#                     return ret_str
#
#     return None

# def search_dict(input_dict, search_term):
#     '''Searches for ingredient from search_term in dictionary'''
#     ret_str = ''
#     search_split = search_term.split()
#     str_index = 0
#     while str_index < len(search_split):
#         # if str_index >= len(search_split):
#         #     return None
#         ret_str = ''
#         if search_split[str_index] in input_dict.keys():
#             ret_str += search_split[str_index]
#             next_index = str_index + 1
#             if next_index >= len(search_split):
#                 return ret_str
#             if search_split[next_index] in input_dict[search_split[str_index]]:
#                 ret_str += ' ' + search_split[next_index]
#                 dict_index = next_index
#                 next_index += 1
#                 if next_index >= len(search_split):
#                     return ret_str
#                 if search_split[next_index] in input_dict[search_split[dict_index]]:
#                     ret_str += ' ' + search_split[next_index]
#
#                 return ret_str
#         else:
#             str_index += 1
#
#     return None
#
# print(search_dict(input_dict=dict, search_term=test_str))
#
# with open('ingredients.json', 'w') as fp:
#     json.dump(dict, fp, sort_keys=True)
