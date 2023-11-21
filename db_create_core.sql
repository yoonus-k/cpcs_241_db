-- Create Company table
CREATE TABLE company (
  company_id SERIAL PRIMARY KEY,
  company_name VARCHAR(255)
);

-- Create Agent table
CREATE TABLE agent (
  agent_id SERIAL PRIMARY KEY,
  agent_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  commission_rate DECIMAL(5),
 
);

-- Create Seller table
CREATE TABLE seller (
  seller_id SERIAL PRIMARY KEY,
  seller_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  company_id INT,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

-- Create Buyer table
CREATE TABLE buyer (
  buyer_id SERIAL PRIMARY KEY,
  buyer_name VARCHAR(255),
  phone VARCHAR(20),
  email VARCHAR(255),
  location VARCHAR(255),
  property_type VARCHAR(255),
  price_range NUMERIC(10),
  company_id INT,
  FOREIGN KEY (company_id) REFERENCES company(company_id)
);

-- Create Property table
CREATE TABLE property (
  property_id SERIAL PRIMARY KEY,
  agent_id INT,
  seller_id INT,
  buyer_id INT,
  description TEXT,
  property_type VARCHAR(255),
  price DECIMAL(10),
  location VARCHAR(255),
  area_size VARCHAR(50),
  bedrooms INT,
  bathrooms INT,
  garage INT,
  FOREIGN KEY (agent_id) REFERENCES agent(agent_id),
  FOREIGN KEY (seller_id) REFERENCES seller(seller_id),
  FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id)
);

-- Create Payment table
CREATE TABLE payment (
  payment_id SERIAL PRIMARY KEY,
  property_id INT,
  amount DECIMAL(10),
  payment_method VARCHAR(255),
  payment_status VARCHAR(255),
  FOREIGN KEY (property_id) REFERENCES property(property_id)
);

-- Create Auction table
CREATE TABLE auction (
  auction_id SERIAL PRIMARY KEY,
  property_id INT,
  starting_bid DECIMAL(10),
  auction_start_date DATE,
  auction_end_date DATE,
  highest_bid DECIMAL(10),
  winning_bid DECIMAL(10),
  buyer_id INT,
  FOREIGN KEY (property_id) REFERENCES property(property_id),
  FOREIGN KEY (buyer_id) REFERENCES buyer(buyer_id)
);