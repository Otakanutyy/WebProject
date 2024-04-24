from rest_framework import serializers
from .models import Profile, Category, Product, ProductPicture, Order, Wishlist, Comment, User

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'address', 'email']

    def create(self, validated_data):
        return Profile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.address = validated_data.get('address', instance.address)
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance


    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance: 
            self.fields["username"].read_only = True
            self.fields["email"].read_only = True
            self.fields["password"].required = False
        else: 
            self.fields["username"].required = True
            self.fields["email"].required = True

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password", "")
        user = User.objects.create_user(**validated_data, password=password)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password", None)

        if password:
            instance.set_password(password)
        instance.save()

        # Update profile using validated profile data
        profile = instance.profile
        profile.name = profile_data.get("name", profile.name)
        profile.save()

        return instance


class ProductPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductPicture
        fields = ['id', 'product', 'front_view', 'back_view', 'side_view']

class OrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ['id', 'user', 'products']

class OrderSerializer2(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Order
        fields = ['id', 'user_id', 'products']

class ProductSerializer2(serializers.ModelSerializer):
    # category = serializers.IntegerField(read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'owner_id', 'name', 'description', 'price', 
                  'brand', 'category_id', 'discount_percentage']
        
class ProductSerializer222(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'owner_id', 'rating','name', 'description', 'price', 
                  'brand', 'category_id', 'discount_percentage', 'is_verified']

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['user', 'products']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'product', 'text', 'created_at']

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['id', 'name', 'description']

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance


class WishlistSerializer(serializers.Serializer):
    user_id = serializers.PrimaryKeyRelatedField(read_only=True)
    products = ProductSerializer222(many=True)

    def create(self, validated_data):
        user = validated_data['user']
        product_data = validated_data['products']
        wishlist = Wishlist.objects.create(user=user)
        for product_item in product_data:
            Product.objects.create(wishlist=wishlist, **product_item)
        return wishlist

    def update(self, instance, validated_data):
        instance.products.clear()
        product_data = validated_data.get('products')
        for product_item in product_data:
            Product.objects.create(wishlist=instance, **product_item)
        return instance
    
class Wishlist2(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Wishlist
        fields = ['user_id', 'products']