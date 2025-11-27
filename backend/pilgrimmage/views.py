import google.generativeai as genai
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import os
from rest_framework.generics import ListAPIView
from .models import Pandit, Temple, LunchSpot
from .serializers import PanditSerializer, TempleSerializer, LunchSpotSerializer


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


SYSTEM_PROMPT = """
You are an AI Itinerary Generator for pilgrimage cities like Vrindavan/Mathura.
Your job is to create:
- A short, clear itinerary summary
- In simple human-friendly language
- Based on the selected Pandit, Temples, and Lunch Spot
- No extra locations should be added
"""

model = genai.GenerativeModel(
    "gemini-2.0-flash",
    system_instruction=SYSTEM_PROMPT,
)

@csrf_exempt
def ai_summary(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=400)

    try:
        body = json.loads(request.body)
        pandit = body.get("pandit")
        temples = body.get("temples", [])
        lunchSpot = body.get("lunchSpot")

        
        prompt = f"""
Generate a clear and engaging itinerary summary for these selections:

Pandit: {pandit}
Temples: {', '.join(temples)}
Lunch Spot: {lunchSpot}

Keep it short, simple, and structured.
"""

        response = model.generate_content(prompt)

        return JsonResponse({"summary": response.text})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


class PanditList(ListAPIView):
    queryset = Pandit.objects.all()
    serializer_class = PanditSerializer

class TempleList(ListAPIView):
    queryset = Temple.objects.all()
    serializer_class = TempleSerializer

class LunchSpotList(ListAPIView):
    queryset = LunchSpot.objects.all()
    serializer_class = LunchSpotSerializer