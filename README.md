# PantryMS - Backend

*This is the backend. The middleware for the frontend and database. To use PantryMS, please also install the PantryMS Frontend.*

PantryMS is a web-based system designed for efficiently managing food items, keeping track of inventory, and providing notifications for low-stock or expiring products. The system allows for the organization of food items into different categories and integrates Discord webhooks for timely notifications.


### Setup

#### 1. Set Up MySQL Database

-   Access your MySQL database, for example, through phpMyAdmin.
    
-   Execute the following SQL commands to create the necessary tables:

```CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) DEFAULT NULL,
  quantity VARCHAR(50) DEFAULT NULL,
  expiration_date DATE DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  unit_type VARCHAR(50) NOT NULL,
  notify TINYINT(1) NOT NULL DEFAULT 0,
  notification_threshold VARCHAR(50) DEFAULT 'not_set'
);

CREATE TABLE IF NOT EXISTS shopping_list (
  item_id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  quantity VARCHAR(255) NOT NULL
);
```


#### 2. Add Demo Data (Optional)

-   If you want to add some demo data to get started, use the following SQL commands:

```
-- Insert demo product data
INSERT INTO products (name, category, quantity, expiration_date, unit_type, notify, notification_threshold)
VALUES
  ('Apple', 'Fruit', '5', '2023-12-31', 'pieces', 1, '2 days'),
  ('Chicken Breast', 'Meat', '2 lbs', '2023-12-15', 'weight', 1, '3 days'),
  ('Milk', 'Dairy', '1 gallon', '2024-01-10', 'volume', 0, 'not_set');

-- Insert demo shopping list data
INSERT INTO shopping_list (name, quantity)
VALUES
  ('Eggs', '1 dozen'),
  ('Bread', '2 loaves');

```

### Using Docker

PantryMS provides an easy deployment option using Docker. Follow these steps to set up the backend with Docker:

1.  **Backend Docker Setup:**
    
    -   Pull the backend Docker container:
        
        `docker pull wiesty/pantrymsbackend:latest` 
        
    -   add the necessary environment variables:
        `
          - DB_HOST=<your_db_host> \
          - DB_USER=<your_db_user> \
          - DB_PASSWORD=<your_db_password> \
          - DB_DATABASE=<your_db_database> \
          - PORT=3001 \
          - DISCORD_WEBHOOK_URL=<your_discord_webhook_url> \` 
        
        Make sure to replace `<your_db_host>`, `<your_db_user>`, `<your_db_password>`, `<your_db_database>`, and `<your_discord_webhook_url>` with your specific configurations.
        
    -   The backend will be accessible at `http://localhost:3001/api/`.
        
2.  **Frontend Docker Setup:**
    
    -   Frontend Docker setup instructions can be found [here](https://github.com/wiesty/PantryMS-Frontend).




### Using Node.js

1.  Clone the repository:
    
    `git clone https://github.com/wiesty/PantryMS-Backend.git
    cd PantryMS-Backend` 
    
2.  Create a `.env` file based on the provided `.env.example`. Fill in the necessary database and Discord Webhook details.
    
3.  Install dependencies:
    
    `npm install` 
    
4.  Run the application:
    
    `npm start` 
    
    The application will be accessible at `http://localhost:3001/api/`.
    


For a full PantryMS setup, ensure both the backend and frontend are configured correctly.

Visit the [PantryMS-Frontend repository](https://github.com/wiesty/PantryMS-Frontend) for instructions on setting up the frontend.


**Disclaimer:** Please note that PantryMS is a hobby project, and as such, I'm unable to provide extensive support. I appreciate your understanding and encourage you to explore and enjoy the system at your own pace. If you encounter any issues, feel free to reach out, and I'll do my best to assist when time permits.

Happy managing with PantryMS!

