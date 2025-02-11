import logging
from APIConnect.APIConnect import APIConnect
from constants.exchange import ExchangeEnum
from constants.order_type import OrderTypeEnum
from constants.product_code import ProductCodeENum
from constants.duration import DurationEnum
from constants.action import ActionEnum
from my_conns import MyConns
import json
# Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s [%(levelname)s] %(message)s',
                    handlers=[])
active_connections= MyConns()
def login_fetch_apiconnect(api_key, secret_key, request_id,
                        settings_path="conf\python-settings.ini"):
    try:
        api_connect = APIConnect(api_key, secret_key, request_id, False, settings_path)
        logging.info("Login successfully for user %s: %s", api_key)
        logging.info(f"api_connect= {api_connect}")
        return api_connect
    except Exception as e:
        logging.error("Error login for user %s: %s", api_key, e)
        return None


def place_eq_trade(userid, stock_symbol, p_quantity, p_limit_price):
    """Place an equity trade for a given user."""
    try:
        api_connect = active_connections.get_connection(userid)
        response = api_connect.PlaceTrade(
            Trading_Symbol=stock_symbol,
            Exchange=ExchangeEnum.NSE,
            Action=ActionEnum.BUY,
            Duration=DurationEnum.DAY,
            Order_Type=OrderTypeEnum.LIMIT,
            Quantity=p_quantity,
            Streaming_Symbol=stock_symbol,
            Limit_Price=p_limit_price,
            Disclosed_Quantity="0",
            TriggerPrice="0",
            ProductCode=ProductCodeENum.CNC
        )
        logging.info("Trade placed successfully for user %s: %s", userid, response)
        return response
    except Exception as e:
        logging.error("Error placing trade for user %s: %s", userid, e)
        return None

def fetch_orders(userid):
    """Place an equity trade for a given user."""
    try:
        #api_connect = APIConnect(api_key, secret_key, request_id, True, settings_path)
        api_connect = active_connections.get_connection(userid)
        response = api_connect.OrderBook()
        logging.info("Orders fetched successfully for user %s: %s", userid, response)
        # Ensure the response is parsed as JSON
        if isinstance(response, str):
            response = json.loads(response)
        return response
    except Exception as e:
        logging.error("Error fetch_orders() for user %s: %s", userid, e)
        return None

# Example usage:
if __name__ == "__main__":
    excel_file_path = "path_to_your_excel_file.xlsx"
    stock_name = "Tatamotors"
    quantity = 5
    limit_price = "1800"
    place_trades_for_multiple_users(excel_file_path, stock_name, quantity, limit_price)