**E-Commerce-Project FullStack**
Full Stack E-Commerce Application (Spring Boot + React + MySQL)

**About**

This is a full-stack e-commerce web application that supports:

User authentication and role-based access

Product browsing and filtering

Cart and address management

Multi-step checkout with Stripe payment integration

The frontend is built using React and Redux, while the backend is powered by Spring Boot and MySQL, following a modular and RESTful design.

**Key Features**

**Authentication & Authorization**
JWT-based authentication using Spring Security

Role-based access control (User/Admin)

Secure login/registration with cookie handling

**Product Management**
Create, update, delete, and fetch products

Filtering by category, keywords, and sorting

Pagination for product listing

Product image upload and display

**User Profile & Address Management**
View and update user profile

Manage multiple addresses (Add/Edit/Delete)

Address selection during checkout

**Cart & Checkout**
Add, update, and remove cart items

Persistent cart using localStorage

Multi-step checkout:

Address Selection

Payment Method

Order Summary

**Payment Integration**
Secure Stripe Payment API integration

Backend handles client secret and payment intent creation

React Stripe Elements for payment UI with error handling and loading states

**Orders Module**
Place and view orders

Order confirmation and validation logic

Orders stored and managed in backend with proper relations

**Technologies Used**

**Backend (Spring Boot)**
Spring Boot

Spring Security (JWT)

Spring Data JPA

Hibernate ORM

MySQL

Lombok

Stripe SDK (Java)

Global Exception Handling

**Frontend (React)**
React.js

Redux & Redux Toolkit

React Hook Form

Tailwind CSS

React Stripe Elements

Axios

