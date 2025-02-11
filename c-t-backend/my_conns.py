#MyConns
class MyConns:
    def __init__(self):
        # Initialize the map of active connections
        self.active_connections = {}

    def connect(self, userid, api_connection):
        if userid and api_connection:
            # Add the connection to the map
            if userid not in self.active_connections:
                self.active_connections[userid] = []
            self.active_connections[userid].append(api_connection)
            return "Connection added successfully"
        return "Invalid request"

    def disconnect(self, userid, api_connection):
        if userid and api_connection and userid in self.active_connections:
            # Remove the connection from the map
            if api_connection in self.active_connections[userid]:
                self.active_connections[userid].remove(api_connection)
                if not self.active_connections[userid]:  # If the list is empty, remove the key
                    del self.active_connections[userid]
                return "Connection removed successfully"
        return "User or connection not found"

    def get_active_connections(self):
        return self.active_connections

    def get_connection(self, userid):
        if userid in self.active_connections:
            return {userid: self.active_connections[userid]}
        return "User not found"

# Example usage
if __name__ == '__main__':
    app = MyConns()
    print(app.connect('user1', 'api_connection1'))
    print(app.connect('user2', 'api_connection2'))
    print(app.connect('user3', 'api_connection3'))
    print(app.connect('user4', 'api_connection4'))
    print(app.get_active_connections())
    print(app.get_connection('user3'))
    print(app.disconnect('user4', 'api_connection4'))
    print(app.get_active_connections())
    print(app.get_connection('user2'))
