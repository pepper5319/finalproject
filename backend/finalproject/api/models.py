from django.db import models
from django.contrib.auth.models import AbstractUser

def recieptsFile(instance, filename):
    return '/'.join( ['reciepts', str(instance.static_id + "_" + filename)])

class PUser(AbstractUser):
    matching_dict = models.TextField()
    def __str__(self):
        return "{}".format(self.username)


class Recipe(models.Model):
    static_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=200)
    recipe_url = models.CharField(max_length=200)
    image_url = models.CharField(max_length=200)
    ingredients = models.TextField()

class PItem(models.Model):
    static_id = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=200)
    date_added = models.DateField(auto_now=True)
    qty = models.PositiveSmallIntegerField()
    exp_date = models.DateField()
    user = models.ForeignKey(PUser,
                             related_name='pitems',
                             on_delete=models.CASCADE)
    def __str__(self):
        return "{0} - {1}".format(self.name, self.user.username)

class Receipt(models.Model):
    static_id = models.CharField(max_length=10, primary_key=True)
    user = models.ForeignKey(PUser,
                             related_name='reciepts',
                             on_delete=models.CASCADE)
    date_added = models.DateField(auto_now=True)
    image = models.ImageField(
        upload_to=recieptsFile,
        max_length=254, blank=True, null=True
    )
