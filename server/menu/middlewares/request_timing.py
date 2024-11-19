from prometheus_client import Histogram

request_time = Histogram('request_processing_seconds', 'Tempo de processamento da requisição')

class RequestTimingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        with request_time.time():
            response = self.get_response(request)
        return response
