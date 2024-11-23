import logging
import time
from menu.metrics import cancel_counter

logger = logging.getLogger(__name__)

class OrderLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'GET' and request.path.startswith('/api/menu-items/'):
            return self.get_response(request)
        elif request.method == 'POST':
            start_time = time.time()
            logger.info(
                f"Recebida requisição POST para {request.path}. Body: {request.body.decode('utf-8', errors='ignore')}"
            )
            try:
                response = self.get_response(request)
                elapsed_time = time.time() - start_time
                logger.info(
                    f"Requisição POST para {request.path} completada. "
                    f"Status: {response.status_code}. Tempo de execução: {elapsed_time:.2f}s."
                )
                if request.path.startswith('/api/orders/') and 'cancel' in request.path:
                    cancel_counter.inc()
                return response
            except Exception as e:
                elapsed_time = time.time() - start_time
                logger.error(
                    f"Erro ao processar requisição POST para {request.path}. "
                    f"Body: {request.body.decode('utf-8', errors='ignore')}. "
                    f"Tempo de execução: {elapsed_time:.2f}s. Erro: {str(e)}"
                )
                raise e
        elif request.path.startswith('/api/orders/') and request.method == 'PATCH' and 'cancel' in request.path:
            cancel_counter.inc()
            return self.get_response(request)

        return self.get_response(request)

