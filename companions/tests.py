from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import CustomUser

class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'email': 'test@example.com',
            'password': 'testpassword',
            'birth_date': '1990-01-01',
            'phone': '+1234567890',
            'city': 'Test City'
        }
        self.user = CustomUser.objects.create_user(**self.user_data)

    def test_user_registration(self):
        response = self.client.post(reverse('register-user'), self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        response = self.client.post(reverse('login'), self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)