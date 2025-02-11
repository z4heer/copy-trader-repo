# main.py
import logging
from APIConnect.APIConnect import APIConnect
from constants.exchange import ExchangeEnum
from constants.order_type import OrderTypeEnum
from constants.product_code import ProductCodeENum
from constants.duration import DurationEnum
from constants.action import ActionEnum
from Transformdata import transform_order_data, transform_net_position_data, transform_holdings_data

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s [%(levelname)s] %(message)s',
                    handlers=[
                        logging.FileHandler("nuvama-api-app.log"),
                        logging.StreamHandler()
                    ])

api_key = "your_api_key"
secret_key = "your_secret_key"
requestId = "your_request_id"
settings_path = "C:\\Users\\HP\\DemoApp\\python-settings.ini"

# Initialize the API connection
api_connect = APIConnect(api_key, secret_key, requestId, True, settings_path)


def get_symbol_details(stock_symbol):
    """Fetch dynamic details for a stock symbol."""
    # Assuming the Streaming_Symbol is in the format {symbol}_NSE
    details = {
        "Streaming_Symbol": f"{stock_symbol}_NSE",
        "Trading_Symbol": stock_symbol
    }
    return details


def place_eq_trade(stock_symbol, quantity, limit_price):
    """Place an equity trade."""
    try:
        details = get_symbol_details(stock_symbol)
        response = api_connect.PlaceTrade(
            Trading_Symbol=details["Trading_Symbol"],
            Exchange=ExchangeEnum.NSE,
            Action=ActionEnum.BUY,
            Duration=DurationEnum.DAY,
            Order_Type=OrderTypeEnum.LIMIT,
            Quantity=quantity,
            Streaming_Symbol=details["Streaming_Symbol"],
            Limit_Price=limit_price,
            Disclosed_Quantity="0",
            TriggerPrice="0",
            ProductCode=ProductCodeENum.CNC
        )
        logging.info("Trade placed successfully: %s", response)
        return response
    except Exception as e:
        logging.error("Error placing trade: %s", e)
        return None


def modify_order(stock_symbol, order_id, quantity, limit_price):
    """Modify an existing order."""
    try:
        details = get_symbol_details(stock_symbol)
        response = api_connect.ModifyTrade(
            Trading_Symbol=details["Trading_Symbol"],
            Exchange=ExchangeEnum.NSE,
            Action=ActionEnum.BUY,
            Duration=DurationEnum.DAY,
            Order_Type=OrderTypeEnum.LIMIT,
            Quantity=quantity,
            CurrentQuantity=quantity,
            Streaming_Symbol=details["Streaming_Symbol"],
            Limit_Price=limit_price,
            Order_ID=order_id,
            Disclosed_Quantity="0",
            TriggerPrice="0",
            ProductCode=ProductCodeENum.CNC
        )
        logging.info("Order modified successfully: %s", response)
        return response
    except Exception as e:
        logging.error("Error modifying order: %s", e)
        return None


def cancel_trade(order_id, stock_symbol):
    """Cancel an existing trade."""
    try:
        details = get_symbol_details(stock_symbol)
        response = api_connect.CancelTrade(
            Order_ID=order_id,
            Exchange=ExchangeEnum.NSE,
            Order_Type=OrderTypeEnum.LIMIT,
            Product_Code=ProductCodeENum.CNC,
            Trading_Symbol=details["Trading_Symbol"],
            Action=ActionEnum.BUY,
            streaming_symbol=details["Streaming_Symbol"],
            CurrentQuantity="1"
        )
        logging.info("Trade canceled successfully: %s", response)
        return response
    except Exception as e:
        logging.error("Error canceling trade: %s", e)
        return None


def position_square_off(stock_symbol, quantity, price):
    """Square off positions."""
    try:
        details = get_symbol_details(stock_symbol)
        orderlist = [
            {
                "Exchange": ExchangeEnum.NSE,
                "TradingSymbol": details["Trading_Symbol"],
                "StreamingSymbol": details["Streaming_Symbol"],
                "Action": ActionEnum.BUY,
                "ProductCode": ProductCodeENum.CNC,
                "Duration": DurationEnum.DAY,
                "Price": price,
                "TriggerPrice": price,
                "OrderType": OrderTypeEnum.LIMIT,
                "Quantity": quantity,
                "DisclosedQuantity": "1",
                "GTDDate": "NA",
                "Remark": "UserRemarksTesting"
            }
        ]
        response = api_connect.PositionSquareOff(orderlist=orderlist)
        logging.info("Position squared off successfully: %s", response)
        return response
    except Exception as e:
        logging.error("Error squaring off position: %s", e)
        return None


def order_list():
    """Get the order book and transform the data."""
    try:
        response = api_connect.OrderBook()
        transformed_orders = transform_order_data(response)
        return transformed_orders
    except Exception as e:
        logging.error("Error fetching order book: %s", e)
        return None


def net_positions():
    """Get net positions and transform the data."""
    try:
        response = api_connect.NetPosition()
        transformed_positions = transform_net_position_data(response)
        return transformed_positions
    except Exception as e:
        logging.error("Error fetching net positions: %s", e)
        return None


def holdings():
    """Get holdings and transform the data."""
    try:
        response = api_connect.Holdings()
        transformed_holdings = transform_holdings_data(response)
        return transformed_holdings
    except Exception as e:
        logging.error("Error fetching holdings: %s", e)
        return None


# Example usage:
if __name__ == "__main__":
    stock_symbol = "INFY"
    quantity = 5
    limit_price = "1800"

    # Place an equity trade
    place_eq_trade(stock_symbol, quantity, limit_price)

    # Modify an existing order
    modify_order(stock_symbol, order_id=211101000000001, quantity=quantity, limit_price=limit_price)

    # Cancel an existing trade
    cancel_trade(order_id=211101000000001, stock_symbol=stock_symbol)

    # Square off positions
    position_square_off(stock_symbol, quantity, price=limit_price)

    # Get and print order list
    orders = order_list()
    if orders:
        logging.info("Order List: %s", orders)

    # Get and print net positions
    net_pos = net_positions()
    if net_pos:
        logging.info("Net Positions: %s", net_pos)

    # Get and print holdings
    holds = holdings()
    if holds:
        logging.info("Holdings: %s", holds)