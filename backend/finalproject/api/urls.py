from django.urls import path, include
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatters = [
    path('recipes/', views.GetRecipesView.as_view(), name='recipe-list'),
    path('recipes/<int:pk>', views.RecipeDetailView.as_view(),
         name='recipe-detail'),
    path('pItems/', views.GetPItemsView.as_view(),
         name='pItem-list'),
    path('pItems/<int:pk>', views.PItemDetailView.as_view(),
         name='pItem-detail'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls'))
]

urlpatterns = format_suffix_patterns(urlpatters)
