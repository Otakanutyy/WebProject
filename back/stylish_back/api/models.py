from django.db import models
from django.core.validators import MaxValueValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, default="user")
    address = models.TextField()
    email = models.EmailField(unique=True)
    
    def __str__(self):
        return f"ID:{self.id},Username:{self.user.username}, Name:{self.name}, Address:{self.address}, Email:{self.email}"

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return f"ID:{self.id}, Name:{self.name}, Description:{self.description}"
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, validators=[MaxValueValidator(100)])
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True)
    stock = models.IntegerField()
    brand = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return (
            f"ID: {self.id}, Name: {self.name}, Description: {self.description}, "
            f"Price: {self.price}, Discount: {self.discount_percentage}, "
            f"Rating: {self.rating}, Stock:{self.stock}, Brand:{self.brand}, "
            f"Category:{self.category}"
        )

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

class ProductPicture(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="pictures")
    front_view = models.ImageField(_("Front View"), upload_to="product_images/", blank=True)
    back_view = models.ImageField(_("Back View"), upload_to="product_images/", blank=True)
    side_view = models.ImageField(_("Side View"), upload_to="product_images/", blank=True)

    def __str__(self):
        return (
            f"ID: {self.id}, Product: {self.product.name}, "
            f"Front View: {self.front_view.url if self.front_view else None}, "
            f"Back View: {self.back_view.url if self.back_view else None}, "
            f"Side View: {self.side_view.url if self.side_view else None}"
        )
    
    class Meta:
        verbose_name = _("ProductPictures")
        verbose_name_plural = _("ProductsPictures")

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"ID:{self.id}, User:{self.user.username}, Created At:{self.created_at}"

class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Wishlist for User:{self.user.username}, Products:{self.products}"

def create_user_wishlist(sender, instance, crated, **kwargs):
    if crated:
        Wishlist.objects.create(user=instance)

def save_user_wishlist(sender, instance, **kwargs):
    instance.wishlist.save()

post_save.connect(create_user_wishlist, sender=User)
post_save.connect(save_user_wishlist, sender=User)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ID:{self.id}, User:{self.user.username}, Product:{self.product.name}, Created At:{self.created_at}"