from django.db import models
from django.contrib.auth.models import AbstractUser


# class PUser(AbstractUser):
#     def __str__(self):
#         return "{}".format(self.username)


class Recipe(models.Model):
    static_id = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    image_url = models.CharField(max_length=200)
    ingredients = models.TextField()


class PItem(models.Model):
    static_id = models.CharField(max_length=10)
    name = models.CharField(max_length=200)
    date_added = models.DateField(auto_now=True)
    qty = models.PositiveSmallIntegerField()
    exp_date = models.DateField()
    # user = models.ForeignKey(PUser,
    #                          related_name='lists',
    #                          on_delete=models.CASCADE)
