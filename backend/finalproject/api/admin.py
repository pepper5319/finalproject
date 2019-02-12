from django.contrib import admin

# Register your models here.
from .models import PItem, Receipt

class PItemAdmin(admin.ModelAdmin):
    pass
admin.site.register(PItem, PItemAdmin)

class ReceiptAdmin(admin.ModelAdmin):
    pass
admin.site.register(Receipt, ReceiptAdmin)
