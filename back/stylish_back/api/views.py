from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404
from .models import Profile, Category, Product, ProductPicture, Order, Wishlist, Comment, User
from .serializers import ( CategorySerializer, ProductBaseSerializer,
                          ProductDetailSerializer, ProductWriteSerializer,
                          ProductPictureSerializer, OrderSerializer, WishlistSerializer,
                          CommentSerializer, ProfileSerializer, UserSerializer)

from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class ProfileListCreateView(generics.ListCreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductWriteSerializer


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()

    def get_serializer_class(self):
                if self.request.method == 'GET':
                    return ProductDetailSerializer
                return ProductWriteSerializer


class ProductPictureListCreateView(generics.ListCreateAPIView):
    queryset = ProductPicture.objects.all()
    serializer_class = ProductPictureSerializer

class ProductPictureRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductPicture.objects.all()
    serializer_class = ProductPictureSerializer

class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated)

class WishlistListCreateView(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsAuthenticated)

class WishlistRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer
    permission_classes = (IsAuthenticated)

class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated)


class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated)


class ProductsByCategoryView(generics.ListAPIView):
    serializer_class = ProductDetailSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)


@api_view(['GET'])
def top_rated_products(request):
    top_products = Product.objects.filter(rating__isnull=False).order_by('-rating')[:10]
    serializer = ProductDetailSerializer(top_products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def wishlist_by_user_id(request, user_id):
    try:
        wishlist = Wishlist.objects.get(user_id=user_id)
        serializer = WishlistSerializer(wishlist)
        return Response(serializer.data)
    except Wishlist.DoesNotExist:
        return Response({"message": "Wishlist not found for the given user ID."}, status=404)
    
@api_view(['GET'])
def orders_by_user_id(request, user_id):
    orders = Order.objects.filter(user_id=user_id)
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def comments_by_product_id(request, product_id):
    comments = Comment.objects.filter(product_id=product_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_wishlist(request, user_id, product_id):
    try:
        wishlist = Wishlist.objects.get(user_id=user_id)
    except Wishlist.DoesNotExist:
        wishlist = Wishlist.objects.create(user_id=user_id)
        
    try:
        product = Product.objects.get(id=product_id)
        wishlist.products.add(product)
        return Response({"message": f"Product '{product.name}' added to wishlist successfully."}, status=200)
    except Product.DoesNotExist:
        return Response({"message": "Product not found."}, status=404)
    
@api_view(['POST'])
def remove_from_wishlist(request, user_id, product_id):
    try:
        wishlist = Wishlist.objects.get(user_id=user_id)
        product = get_object_or_404(Product, id=product_id)
        wishlist.products.remove(product)
        return Response({"message": f"Product '{product.name}' removed from wishlist successfully."}, status=200)
    except Wishlist.DoesNotExist:
        return Response({"message": "Wishlist not found for the given user ID."}, status=404)
    except Product.DoesNotExist:
        return Response({"message": "Product not found."}, status=404)
    
# @api_view(['POST'])
# def add_comment_to_product(request, product_id):
#     try:
#         product = get_object_or_404(Product, id=product_id)
#         user_id = request.data.get('user_id')
#         user = get_object_or_404(User, id=user_id)
#         comment_text = request.data.get('text')
#         comment = Comment.objects.create(product=product, user=user, text=comment_text)
#         serializer = CommentSerializer(comment)
#         return Response(serializer.data, status=201)
#     except Product.DoesNotExist:
#         return Response({"message": "Product not found."}, status=404)
#     except User.DoesNotExist:
#         return Response({"message": "User not found."}, status=404)
    
# @api_view(['POST'])
# def add_order(request, user_id, product_id):
#     try:
#         user = get_object_or_404(User, id=user_id)
#         product = get_object_or_404(Product, id=product_id)
#         order = Order.objects.create(user=user)
#         order.products.add(product)
#         serializer = OrderSerializer(order)
#         return Response(serializer.data, status=201)
#     except User.DoesNotExist:
#         return Response({"message": "User not found."}, status=404)
#     except Product.DoesNotExist:
#         return Response({"message": "Product not found."}, status=404)

@api_view(['DELETE'])
def remove_order(request, user_id, order_id):
    try:
        order = get_object_or_404(Order, id=order_id, user_id=user_id)
        order.delete()
        return Response({"message": "Order removed successfully."}, status=204)
    except Order.DoesNotExist:
        return Response({"message": "Order not found."}, status=404)

@api_view(['GET'])
def product_pictures_by_product_id(request, product_id):
    picture = ProductPicture.objects.get(product_id=product_id)
    serializer = ProductPictureSerializer(picture)
    return Response(serializer.data)


class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, id):
        try:
            user = User.objects.get(id=id)
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        user = User.objects.get(id=id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)