from django.contrib import admin

# Register your models here.
from .models import PItem, Receipt, PUser, Recipe,UPCDatabase

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

class UPCDatabaseAdmin(admin.ModelAdmin):
    pass
admin.site.register(UPCDatabase, UPCDatabaseAdmin)
