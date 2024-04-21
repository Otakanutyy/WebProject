from django.urls import path
from .views import (
    ProfileListCreateView, ProfileRetrieveUpdateDestroyView,
    CategoryListCreateView, CategoryRetrieveUpdateDestroyView,
    ProductList,ProductCreateView,ProductRetrieveUpdateDestroyView,
    ProductPictureListCreateView, ProductPictureRetrieveUpdateDestroyView,
    OrderListCreateView, OrderRetrieveUpdateDestroyView,
    WishlistListCreateView, WishlistRetrieveUpdateDestroyView,
    CommentListCreateView, CommentRetrieveUpdateDestroyView,
    ProductsByCategoryView,  add_to_wishlist, product_pictures_by_product_id, remove_from_wishlist, top_rated_products,
    wishlist_by_user_id, comments_by_product_id, UserList, UserDetail)
# add_comment_to_product, add_order,
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    #login
    path('login/', TokenObtainPairView.as_view()),
    path('refresh/', TokenRefreshView.as_view()),

    path("users/", UserList.as_view()),
    path("users/<int:id>", UserDetail.as_view()),
    # CustomUser URLs
    path('users/', ProfileListCreateView.as_view(), name='user-list'),
    path('users/<int:pk>/', ProfileRetrieveUpdateDestroyView.as_view(), name='user-detail'),

    # Category URLs
    path('categories/', CategoryListCreateView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryRetrieveUpdateDestroyView.as_view(), name='category-detail'),

    # Product URLs
    path('products/', ProductList.as_view(), name='product-list'),
    path('products/create/', ProductCreateView.as_view(), name='product-create'),
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view(), name='product-detail'),

    # ProductPicture URLs
    path('product-pictures/', ProductPictureListCreateView.as_view(), name='product-picture-list'),
    path('product-pictures/<int:pk>/', ProductPictureRetrieveUpdateDestroyView.as_view(), name='product-picture-detail'),

    # Order URLs
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    path('orders/<int:pk>/', OrderRetrieveUpdateDestroyView.as_view(), name='order-detail'),

    # Wishlist URLs
    path('wishlists/', WishlistListCreateView.as_view(), name='wishlist-list'),
    path('wishlists/<int:pk>/', WishlistRetrieveUpdateDestroyView.as_view(), name='wishlist-detail'),

    # Comment URLs
    path('comments/', CommentListCreateView.as_view(), name='comment-list'),
    path('comments/<int:pk>/', CommentRetrieveUpdateDestroyView.as_view(), name='comment-detail'),

    # Additional URLs
    path('products/by-category/<int:category_id>/', ProductsByCategoryView.as_view(), name='products-by-category'),
    path('products/top-rated/', top_rated_products, name='top-rated-products'),
    path('wishlist/<int:user_id>/', wishlist_by_user_id, name='wishlist-by-user'),
    path('comments/product/<int:product_id>/', comments_by_product_id, name='comments-by-product'),
    path('wishlist/<int:user_id>/add/<int:product_id>/', add_to_wishlist, name='add-to-wishlist'),
    path('wishlist/<int:user_id>/remove/<int:product_id>/', remove_from_wishlist, name='remove-from-wishlist'),
    # path('products/<int:product_id>/comments/', add_comment_to_product, name='add-comment-to-product'),
    # path('orders/<int:user_id>/add/<int:product_id>/', add_order, name='add-order'),
]
