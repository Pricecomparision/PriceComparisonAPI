from django.shortcuts import render

# Create your views here
from rest_framework import generics, status
from .models import Product
from .serializers import ProductSerializer
from django.views.generic import TemplateView
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import ProductSerializer

@api_view(['POST'])
def add_product(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    

class ApiListView(TemplateView):
    template_name = 'api_list.html'
    
class ProductistView(TemplateView):
    template_name = 'all_list.html'    

class searchistView(TemplateView):
    template_name = 'search_list.html' 

class ProductDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
class ProductCreateAPIView(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    

class ProductListCreateAPIView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        name_query = self.request.query_params.get('name', None)
        price_query = self.request.query_params.get('price', None)
        retailer_query = self.request.query_params.get('retailer', None)
        
        if name_query:
            queryset = queryset.filter(name__icontains=name_query)
        if price_query:
            queryset = queryset.filter(price=price_query)
        if retailer_query:
            queryset = queryset.filter(retailer__icontains=retailer_query)
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    