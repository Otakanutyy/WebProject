from django.db import models
from django.core.validators import MaxValueValidator
from django.contrib.auth.models import User



class Manager(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Id:{self.id}"

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
    rating = models.DecimalField(max_digits=3, decimal_places=2, null=True)
    brand = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, validators=[MaxValueValidator(100)], null=True)
    is_verified = models.BooleanField(default=False)
    owner_id = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    def __str__(self):
        return (
            f"ID: {self.id}, Name: {self.name}, Description: {self.description}, "
            f"Price: {self.price}, "
            f"Rating: {self.rating}, Brand:{self.brand}, "
            f"Category:{self.category}"
        )

    class Meta:
        verbose_name = ("Product")
        verbose_name_plural = ("Products")

class ProductPicture(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="pictures")
    front_view = models.ImageField(("Front View"), upload_to="product_images/", blank=True)
    back_view = models.ImageField(("Back View"), upload_to="product_images/", blank=True)
    side_view = models.ImageField(("Side View"), upload_to="product_images/", blank=True)

    def __str__(self):
        return (
            f"ID: {self.id}, Product: {self.product.name}, "
            f"Front View: {self.front_view.url if self.front_view else None}, "
            f"Back View: {self.back_view.url if self.back_view else None}, "
            f"Side View: {self.side_view.url if self.side_view else None}"
        )
    
    class Meta:
        verbose_name = ("ProductPictures")
        verbose_name_plural = ("ProductsPictures")

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    closed = models.BooleanField(default=False)

    def __str__(self):
        return f"ID:{self.id}, User:{self.user.username}, Products:{self.products}"



class Wishlist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Wishlist for User:{self.user.username}, Products:{self.products}"


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ID:{self.id}, User:{self.user.username}, Product:{self.product.name}, Created At:{self.created_at}"