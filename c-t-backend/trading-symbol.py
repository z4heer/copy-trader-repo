#trading-symbol.py
import os
import pandas as pd
print(pd.__version__)

file_path = os.path.join('instruments', 'instruments.csv')


def get_trading_symbol(df, p_symbolname):
    """Fetch the trading symbol for a given symbol name."""
    if df is not None:
        result = df[df['symbolname'].str.upper() == p_symbolname.upper()]
        if not result.empty:
            return result.iloc[0]['tradingsymbol']
        else:
            print(f"Error: Symbol name {symbolname} not found in the instruments data.")
            return None
    return None


def load_instruments(p_file_path):
    """Load the instruments data from a CSV file."""
    try:
        df = pd.read_csv(p_file_path)
        return df
    except FileNotFoundError:
        print(f"Error: The file {p_file_path} was not found.")
        return None
    except Exception as e:
        print(f"An error occurred while loading the instruments data: {str(e)}")
        return None
    
# Example usage
if __name__ == "__main__":
    symbolname = input("Enter the symbol name: ").strip()

    instruments_df = load_instruments(file_path)
    trading_symbol = get_trading_symbol(instruments_df, symbolname)

    if trading_symbol:
        print(f"The trading symbol for {symbolname} is {trading_symbol}.")