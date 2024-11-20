import csv
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from io import BytesIO
from reportlab.pdfgen import canvas
from django.http import FileResponse
from menu.services.report_service import get_top_items, get_peak_hours, get_menu_item_report

class ReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            report = get_menu_item_report()
            data = [
                {
                    'id': item.id,
                    'name': item.name,
                    'total_orders': item.total_orders,
                }
                for item in report
            ]
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"Erro ao gerar relatório: {e}")
            return Response({'error': 'Erro ao gerar relatório'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReportAnalysisView(APIView):
    def get(self, request):
        try:
            top_items = get_top_items()
            peak_hours = get_peak_hours()
            return Response({
                'top_items': list(top_items),
                'peak_hours': list(peak_hours),
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ExportReportCSVView(APIView):
    def get(self, request):
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="report.csv"'

        writer = csv.writer(response)
        writer.writerow(['Item', 'Total Orders'])
        for item in get_menu_item_report():
            writer.writerow([item.name, item.total_orders])

        return response
    
class ExportReportPDFView(APIView):
    def get(self, request):
        buffer = BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 750, "Report")
        y = 700
        for item in get_menu_item_report():
            p.drawString(100, y, f"{item.name}: {item.total_orders}")
            y -= 20
        p.save()
        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename='report.pdf')
