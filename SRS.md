UNIVERSITY OF NORTH TEXAS

College of Engineering

Department of Computer Science

For Restaurant-App

prepared by Roshan Mainali, Sangita Moktan, Wassim Lagnaoui, Jesse Sainz

# SOFTWARE REQUIREMENTS SPECIFICATION

### 1. Introduction
##### 1.1 - Purpose
The purpose of this system is to record the orders made by the customer on a tablet at the table, transfer those orders to the wait staff and kitchen staff all while being able to help the customer at a moment's notice if they need assistance.
The best way to decrease expenses and increase profit in the restaurant business is to decrease the number of employees as each individual employee can handle more tables at times.

The proposed system will increase order accuracy and decrease the time between the customer sitting down and receiving their food. It will also decrease the time the customer has to wait to pay for their order. This should increase the overall satisfaction of the customer, promoting return business.

##### 1.2 - Scope
To start, we are going to focus only on the customers, the servers, and the kitchen. By acting as an intermediate part, we will be able to speed up the 
process of ordering food, getting the order to the kitchen, and getting completed orders to tables. Not only will this system benefit the customer, 
but servers will now be able to manage their tables and orders more efficiently. The app will be used for several business promotion and customer can quickly give their recommendations to their dear ones.

##### 1.3 - References
Currently our SRS do not require any reference since we will be surfing the internet and the course slide for format. The document is built on the following references:
- IEEE Std R. S. Pressman, Software engineering: a practitioners approach, 8th ed. New York, NY: McGraw-Hill Education, 2014.
 
---

### 2. Overall Description
Our system of applications will provide an overall better experience for customers at a restaurant by decreasing the time it takes to place and order, receive their order, and pay for the order. The system will also provide the wait staff and kitchen staff of the restaurant by organizing orders and giving them notifications on when orders are placed or are ready to be served. Overall, this application will provide better communication between the customers, kitchen staff, and wait staff
##### 2.1 - User Characteristics
We are assuming the customer would like to be in and out in the shortest amount of time. And if not, they would at least like to receive their order in the shortest time possible. With this system, the user will have to have at least a minimal understanding of touch screen based UI, as the customer interface will take place on an iOS based tablet.

The restaurant staff will also need a minimal understanding of touch screen based UI as well. The kitchen staff’s UI will be on an Android or iOS tablet. The wait staff’s UI will be on an Android or iOS smartphone.

##### 2.2 - Constraints / Assumptions
Our system will have a payment system, and will require a solid security system to manage payments.

Staff can be trained to use the system. However, if customers aren’t comfortable using the system, they will be free to put their order through with the waiter as well.

### 3. Requirements
##### 3.1.1 User Interface
The User interface will feature a first page menu that allow the user to choose the category of the food( Appetizers, Entrees, Dessert, … ). See figure 1. 

![iPad Pro 10 5in – 2](https://user-images.githubusercontent.com/25487419/66098813-c6bb4800-e569-11e9-9253-ec634e95c6bd.png)
figure1

![iPad Pro 10 5in – 1](https://user-images.githubusercontent.com/25487419/66098795-b4410e80-e569-11e9-87a7-44d7e729bce4.png)
figure 2

The application will include the following pages:
- Home/Menu page showing all categories of food.
- Specialty pizza page 
- Entrees page
- Appetizers page
- Desserts page. 
- Pasta page.
- Desserts page.
- Drinks page.  
##### 3.1.2 Hardware
The software product will be compatible any Tablet  running IOS. eEach table will have a tablet that the users will be able to interact with. The Kitchen will a tablet running the system to see orders being placed.The wait staff will carry smartphones with the system application on it. This makes mobility easier since wait staff is constantly moving around. The API will also have to be running on a server with enough CPU power to handle a significant number of requests to it.
##### 3.1.3 Software Interface
There will be 3 separate interfaces. The user interface, the API, and the database.The User interface will be implemented using React native, and will send messages to the API to signal events such as an order being placed. The API will also send data (such as the order) to both kitchen and wait staff. The API will use a database to organize the corresponding data (i.e. servers, orders, tables, etc.). MySQL will be used as a database hosted on MAMP Server. 
##### 3.1.4 Communication Interface
The user interfaces will need a way to communicate to each other through the API. The API will be RESTful, meaning it uses http. This means will need a port accessible by the user interfaces but will only allow authorized devices to communicate with it.
#### 3.2 - Product Functions
3.2.1 - Customers
The system will allow the customer to place an order with menu items.
The system shall allow customers to add comments on their order meals to assign the allergies or special requests.
The system will allow the customer to filter menu items by tags that were defined by management. The system will allow the customer to edit menu items by the addition, substitution or omission.

After the meal is delivered, and the customer is ready to pay, they can choose to pay using our system, or have the server take care of it.

##### 3.2.2 - Wait Staff
The system will give the wait staff an overview of tables they are in charge in and give staff different visual prompts depending on various situations defined below.
- The system will notify the wait staff when they need to process cash payments.
- The system will notify the wait staff if the customer pressed the help button.
- The system will notify the wait staff when food is ready to bring out.
- The system will allow wait staff to take or edit the orders for customers if needed.
##### 3.2.3 - Kitchen Staff
- The system will allow the kitchen to see all the orders they need to cook, with menu items, and any modifications and/or comments listed.
- The orders will be displayed as a list on the UI as the order is received and in order. 
- The system will allow the kitchen to prompt wait staff if there is any clarification needed.
- The system will allow the kitchen to mark orders as complete, and prompt wait staff to pick up food.
 
After the meal is delivered, and the customer is ready to pay, they can choose to pay using our system, or have the waiter take care of it.
 
### 4. Glossary
- Customer- One of the users of the system, will order, and pay
- Kitchen- One of the users of the system, they use the software to get instructions on what to prepare and notify a wait staff.
- Menu items- Consists of the name, price, ingredients, and calories
- Wait Staff - One of the user’s of the systems. The waiter will be notified about the customer orders as well as the prepared order form the kitchen. they will also be able to track the number of tables occupied by guests as well as the vacant tables.
 
 

