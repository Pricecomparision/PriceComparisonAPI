from django.urls import path
from .views import ProductListCreateAPIView,ProductDetailAPIView,ApiListView,ProductCreateAPIView,ProductistView,searchistView

urlpatterns = [
    path('api/products/', ProductListCreateAPIView.as_view(), name='product-list-create'),
    path('api/products/<int:pk>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('api/', ApiListView.as_view(), name='api-list'),
    path('api/productdtls/', ProductistView.as_view(), name='pro-list'),
    path('api/searchdtls/', searchistView.as_view(), name='pro-list'),
     path('api/productsdata/', ProductCreateAPIView.as_view(), name='product-create'),
]