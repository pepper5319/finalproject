from django.contrib import admin
from .models import PItem, Receipt, PUser, Recipe

class PItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(PItem, PItemAdmin)

class PUserAdmin(admin.ModelAdmin):
    pass
admin.site.register(PUser, PUserAdmin)

class ReceiptAdmin(admin.ModelAdmin):
    pass
admin.site.register(Receipt, ReceiptAdmin)

class RecipeAdmin(admin.ModelAdmin):
    pass
admin.site.register(Recipe, RecipeAdmin)
