from prometheus_client import Counter, REGISTRY

# Verifica se a métrica já existe no registry
if 'order_cancel_total' not in REGISTRY._names_to_collectors:
    cancel_counter = Counter('order_cancel_total', 'Total de pedidos cancelados')
else:
    cancel_counter = REGISTRY._names_to_collectors['order_cancel_total']
