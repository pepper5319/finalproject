from django.test import TestCase
from .models import Recipe, PUser, PItem
import random, string
# Create your tests here.
def updateMatches(user, recipes, thresh, pItems):
    '''
    user: PUser, object
    recipes: Recipe, list
    thresh: float
    '''
    matches = []
    # pItems = PItem.objects.filter(user=user)
    for r in recipes:
        sim = calc_similarities(r.ingredients, pItems)
        if(sim > thresh):
            matches.append(r.static_id)
    user.matching_dict = matches
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


def create_recipe(ingList):
    """
    Create Recipe
    """
    x = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(10))

    return Recipe.objects.create(static_id=x, name='R{}'.format(x), ingredients=ingList)

class PUserTestsModelTests(TestCase):

    def test_user_has_match(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """
        ingredients = ['chicken', 'parmassian', 'memes', 'cheese']
        pantry = ['chicken', 'parmassian', 'cheese', 'dirt']
        user = PUser.objects.create(matching_dict=[])
        recipe = create_recipe(ingredients)
        updateMatches(user, [recipe], 0.6, pantry)
        self.assertIn(recipe.static_id, user.matching_dict)

    def test_user_has_no_match(self):
        """
        was_published_recently() returns False for questions whose pub_date
        is in the future.
        """
        ingredients = ['chicken', 'parmassian', 'memes', 'cheese']
        pantry = ['chicken', 'parmassian', 'cheese', 'dirt']
        user = PUser.objects.create(matching_dict=[])
        recipe = create_recipe(ingredients)
        updateMatches(user, [recipe], 0.8, pantry)
        self.assertNotIn(recipe.static_id, user.matching_dict)
