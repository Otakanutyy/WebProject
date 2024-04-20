from rest_framework import serializers
from .models import OrderItem, Profile, Category, Product, ProductPicture,  Wishlist, Comment, User, newOrder

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
        model = newOrder
        fields = ['id', 'user_id', 'date_ordered']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'user_id', 'order_id', 'product_id']


class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        fields = ['user', 'products']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'user', 'product', 'text', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class ProductBaseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    rating = serializers.DecimalField(max_digits=3, decimal_places=2, required=False)
    description = serializers.CharField()
    brand = serializers.CharField(max_length=100)
    discount_percentage = serializers.DecimalField(max_digits=5, decimal_places=2)

class ProductDetailSerializer(ProductBaseSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.price = validated_data.get('price', instance.price)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.brand = validated_data.get('brand', instance.brand)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance

class ProductWriteSerializer(ProductBaseSerializer):
    description = serializers.CharField()
    category_id = serializers.IntegerField()

    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.brand = validated_data.get('brand', instance.brand)
        instance.category_id = validated_data.get('category_id', instance.category_id)
        instance.save()
        return instance

