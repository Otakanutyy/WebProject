from django.contrib import admin

from .models import Manager, Profile, Category, Product, ProductPicture, Order, Wishlist, Comment

admin.site.register(Manager)
admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(ProductPicture)
admin.site.register(Order)
admin.site.register(Wishlist)
admin.site.register(Comment)
