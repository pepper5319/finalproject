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
