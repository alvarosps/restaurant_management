import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from menu.models.menu_item import MenuItem
from menu.models.order import Order

def load_data():
    menu = pd.DataFrame(list(MenuItem.objects.values('id', 'name', 'description', 'price')))
    menu.rename(columns={'id': 'item_id', 'description': 'ingredients'}, inplace=True)

    orders = pd.DataFrame(list(Order.objects.values('user_id', 'menu_item_id')))
    orders.rename(columns={'menu_item_id': 'item_id'}, inplace=True)

    return menu, orders

def recommend_items(user_id):
    menu, orders = load_data()

    user_orders = orders[orders['user_id'] == user_id]
    user_items = menu[menu['item_id'].isin(user_orders['item_id'])]

    if user_items.empty:
        return []

    vectorizer = CountVectorizer(tokenizer=lambda x: x.split(', '))
    item_vectors = vectorizer.fit_transform(menu['ingredients'].fillna(''))

    similarity_matrix = cosine_similarity(item_vectors)

    recommendations = []
    for item_id in user_items['item_id']:
        try:
            similar_items = list(enumerate(similarity_matrix[menu.index[menu['item_id'] == item_id][0]]))
        except IndexError:
            continue

        similar_items = sorted(similar_items, key=lambda x: x[1], reverse=True)

        for sim_item_id, score in similar_items:
            item = menu.iloc[sim_item_id]
            if item['item_id'] not in user_orders['item_id'].values:
                recommendations.append(item)

    recommendations_df = pd.DataFrame(recommendations).drop_duplicates()

    recommendations_df.rename(columns={'item_id': 'id'}, inplace=True)
    return recommendations_df[['id', 'name', 'ingredients', 'price']].to_dict(orient='records')

