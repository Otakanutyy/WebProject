
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from .models import Profile, Category, Product, ProductPicture, Order, Wishlist, Comment, User, Manager
from .serializers import ( CategorySerializer, 
                           ProductSerializer2, ProductSerializer222,
                          ProductPictureSerializer, OrderSerializer, OrderSerializer2, WishlistSerializer,
                          Wishlist2,
                          CommentSerializer, ProfileSerializer)

from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import authentication

class IsManager(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.is_manager

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


class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer222


class ProductPictureListCreateView(generics.ListCreateAPIView):
    queryset = ProductPicture.objects.all()
    serializer_class = ProductPictureSerializer

class ProductPictureRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductPicture.objects.all()
    serializer_class = ProductPictureSerializer

class ProductPictureByProduct(generics.RetrieveAPIView):
    serializer_class = ProductPictureSerializer

    def get_object(self):
        product_id = self.kwargs.get('product_id') 
        pictures = get_object_or_404(ProductPicture, product_id=product_id)
        return pictures

class WishlistByUser(generics.RetrieveUpdateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        wishlist = get_object_or_404(Wishlist, user=self.request.user)
        return wishlist
    
        

class ProductsByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer222

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)

class ProductsByOwner(generics.ListAPIView):
    serializer_class = ProductSerializer222
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Product.objects.filter(owner_id=self.request.user)


class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer222

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer2
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner_id=user)

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer2
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
        
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)

class WishlistListCreateView(generics.ListCreateAPIView):
    serializer_class = WishlistSerializer 
    permission_classes = (IsAuthenticated,)

class WishlistRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WishlistSerializer
    permission_classes = (IsAuthenticated,)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance)
    #     return Response(serializer.data)


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated,)


class CommentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticated)





@api_view(['GET'])
def top_rated_products(request):
    top_products = Product.objects.filter(rating__isnull=False).order_by('-rating')[:10]
    serializer = ProductSerializer222(top_products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def comments_by_product_id(request, product_id):
    comments = Comment.objects.filter(product_id=product_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request, product_id):
    user_id = request.user.id
    try:
        wishlist = Wishlist.objects.get(user_id=user_id)
    except Wishlist.DoesNotExist:
        wishlist = Wishlist.objects.create(user_id=user_id)

    try:
        product = Product.objects.get(pk=product_id)
    except Product.DoesNotExist:
        return Response({"error": "Product does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    wishlist.products.add(product)
    wishlist.save()

    serializer = WishlistSerializer(wishlist)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

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
    


@api_view(['DELETE'])
def remove_order(request, user_id, order_id):
    try:
        order = get_object_or_404(Order, id=order_id, user_id=user_id)
        order.delete()
        return Response({"message": "Order removed successfully."}, status=204)
    except Order.DoesNotExist:
        return Response({"message": "Order not found."}, status=404)

    
class ManagerAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return None

        try:
            user = Manager.objects.get(user__username=username).user
        except Manager.DoesNotExist:
            return None

        if user.check_password(password):
            return (user, None)
        else:
            raise AuthenticationFailed('Invalid username or password')


class ManagerLoginView(APIView):
    authentication_classes = [ManagerAuthentication]

    def post(self, request):
        serializer = TokenObtainPairSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)
    
# class UserList(APIView):
#     def get(self, request):
#         users = User.objects.all()
#         serializer = UserSerializer(users, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserDetail(APIView):
#     def get(self, request, id):
#         try:
#             user = User.objects.get(id=id)
#             serializer = UserSerializer(user)
#             return Response(serializer.data)
#         except User.DoesNotExist as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     def patch(self, request, id):
#         try:
#             user = User.objects.get(id=id)
#             serializer = UserSerializer(user, data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response(serializer.data)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#         except User.DoesNotExist as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     def delete(self, request, id):
#         user = User.objects.get(id=id)
#         user.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# class WishlistByUserId(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user_id = request.user.id
#         try:
#             wishlist = Wishlist.objects.get(user_id=user_id)
#             serializer = WishlistSerializer(wishlist)
#             return Response(serializer.data)
#         except Wishlist.DoesNotExist:
#             return Response({"error": "Wishlist not found"}, status=status.HTTP_404_NOT_FOUND)