from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from menu.services.recommendation_service import recommend_items

class RecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        recommendations = recommend_items(user_id)
        return Response(recommendations)
