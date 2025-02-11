# Transformdata.py
from datetime import datetime

def transform_order_data(order_data):
    """Transform order data from API response to the expected format."""
    transformed_orders = []

    for order in order_data['data']['ord']:
        transformed_order = {
            "orderId": order.get("ordID", "N/A"),
            "type": "Buy" if order.get("opTyp") == "BUY" else "Sell",
            "quantity": int(order.get("reqQty", 0)),
            "status": order.get("sts", "unknown").lower(),
            "userid": order.get("userID", "N/A"),
            "timestamp": datetime.utcfromtimestamp(int(order.get("epochTim"))).strftime('%Y-%m-%dT%H:%M:%SZ') if order.get("epochTim") else "N/A"
        }
        transformed_orders.append(transformed_order)

    return transformed_orders

def transform_net_position_data(net_position_data):
    """Transform net position data from API response to the expected format."""
    transformed_positions = []

    for position in net_position_data['data']['pos']:
        transformed_position = {
            "orderId": position.get("trdSym", "N/A"),
            "type": "N/A",  # This field is not available in net positions
            "quantity": int(position.get("ntQty", 0)),
            "status": "N/A",  # This field is not available in net positions
            "userid": "N/A",  # This field is not available in net positions
            "timestamp": "N/A"  # This field is not available in net positions
        }
        transformed_positions.append(transformed_position)

    return transformed_positions

def transform_holdings_data(holdings_data):
    """Transform holdings data from API response to the expected format."""
    transformed_holdings = []

    for holding in holdings_data['data']['rmsHdg']:
        transformed_holding = {
            "orderId": holding.get("trdSym", "N/A"),
            "type": "N/A",  # This field is not available in holdings
            "quantity": int(holding.get("totalQty", 0)),
            "status": "N/A",  # This field is not available in holdings
            "userid": "N/A",  # This field is not available in holdings
            "timestamp": "N/A"  # This field is not available in holdings
        }
        transformed_holdings.append(transformed_holding)

    return transformed_holdings