from django.contrib import admin

# Register your models here.
from .models import PItem

class PItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(PItem, PItemAdmin)
