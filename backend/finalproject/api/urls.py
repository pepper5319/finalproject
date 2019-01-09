from django.urls import path
from api import views

urlpatters = [
    path('recipes/', views.GetRecipesView.as_view(), name='recipe-list'),
    path('recipes/<int:pk>', views.RecipeDetailView.as_view(),
         name='recipe-detail'),
    path('pItems/', views.GetPItemsView.as_view(),
         name='pItem-list'),
    path('pItems/<int:pk>', views.PItemDetailView.as_view(),
         name='pItem-detail')
]
