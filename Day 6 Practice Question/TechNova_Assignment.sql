-- Active: 1761808069171@@127.0.0.1@3306@technovadb
-- ==========================================================
-- TechNova Pvt. Ltd.
-- Employee Rewards & Performance Management System
-- SQL Assignment Solution
-- ==========================================================
-- Author: Priyansh
-- Description: Complete MySQL script covering DDL, DML, DQL,
-- Joins, Subqueries, TCL, Index optimization
-- ==========================================================

-- ==========================================================
-- USER STORY 1 — DATABASE SETUP (DDL)
-- ==========================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS TechNovaDB;
USE TechNovaDB;

-- 2. Create Tables

-- Department Table
CREATE TABLE Department (
    DeptID INT PRIMARY KEY,
    DeptName VARCHAR(50) NOT NULL UNIQUE,
    Location VARCHAR(50)
);

-- Employee Table
CREATE TABLE Employee (
    EmpID INT PRIMARY KEY,
    EmpName VARCHAR(50) NOT NULL,
    Gender ENUM('M', 'F') NOT NULL,
    DOB DATE,
    HireDate DATE,
    DeptID INT,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Project Table
CREATE TABLE Project (
    ProjectID INT PRIMARY KEY,
    ProjectName VARCHAR(100),
    DeptID INT,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (DeptID) REFERENCES Department(DeptID)
);

-- Performance Table
CREATE TABLE Performance (
    EmpID INT,
    ProjectID INT,
    Rating DECIMAL(3,1),
    ReviewDate DATE,
    PRIMARY KEY (EmpID, ProjectID),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID),
    FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);

-- Reward Table
CREATE TABLE Reward (
    EmpID INT,
    RewardMonth DATE,
    RewardAmount DECIMAL(10,2),
    PRIMARY KEY (EmpID, RewardMonth),
    FOREIGN KEY (EmpID) REFERENCES Employee(EmpID)
);

-- 3. Create Indexes for optimization
CREATE INDEX idx_empname ON Employee(EmpName);
CREATE INDEX idx_deptid ON Employee(DeptID);

-- ==========================================================
-- USER STORY 2 — INSERT AND MANAGE DATA (DML)
-- ==========================================================

-- Insert Department Records
INSERT INTO Department VALUES
(101, 'IT', 'Bangalore'),
(102, 'HR', 'Delhi'),
(103, 'Finance', 'Mumbai'),
(104, 'Marketing', 'Pune'),
(105, 'Operations', 'Hyderabad');

-- Insert Employee Records
INSERT INTO Employee VALUES
(1, 'Asha', 'F', '1990-07-12', '2018-06-10', 101),
(2, 'Raj', 'M', '1988-04-09', '2020-03-22', 102),
(3, 'Neha', 'F', '1995-01-15', '2021-08-05', 101),
(4, 'Amit', 'M', '1992-10-20', '2019-11-15', 103),
(5, 'Karan', 'M', '1993-05-12', '2022-01-03', 104);

-- Insert Project Records
INSERT INTO Project VALUES
(201, 'Payroll System', 103, '2020-01-01', '2020-12-31'),
(202, 'HR Portal', 102, '2021-03-01', '2021-09-30'),
(203, 'TechNova App', 101, '2022-01-15', '2022-11-30'),
(204, 'Marketing Dashboard', 104, '2023-04-01', '2023-10-15'),
(205, 'ERP Integration', 101, '2024-01-10', NULL);

-- Insert Performance Records
INSERT INTO Performance VALUES
(1, 203, 4.5, '2023-12-15'),
(2, 202, 4.0, '2023-09-20'),
(3, 205, 4.8, '2024-06-30'),
(4, 201, 3.9, '2021-12-15'),
(5, 204, 4.2, '2023-09-10');

-- Insert Reward Records
INSERT INTO Reward VALUES
(1, '2024-03-01', 2500),
(2, '2024-02-01', 1800),
(3, '2024-04-01', 3000),
(4, '2023-12-01', 900),
(5, '2024-06-01', 2100);

-- Update one employee’s department
UPDATE Employee
SET DeptID = 103
WHERE EmpID = 2;

-- Delete one reward record where amount is less than 1000
DELETE FROM Reward
WHERE RewardAmount < 1000;

-- ==========================================================
-- USER STORY 3 — GENERATE INSIGHTS (DQL)
-- ==========================================================

-- 1. Employees who joined after 2019-01-01
SELECT * FROM Employee
WHERE HireDate > '2019-01-01';

-- 2. Average performance rating per department
SELECT d.DeptName, AVG(p.Rating) AS AvgRating
FROM Performance p
JOIN Employee e ON p.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
GROUP BY d.DeptName;

-- 3. List employees with their age
SELECT EmpName, TIMESTAMPDIFF(YEAR, DOB, CURDATE()) AS Age
FROM Employee;

-- 4. Total rewards given in the current year
SELECT YEAR(RewardMonth) AS Year, SUM(RewardAmount) AS TotalRewards
FROM Reward
WHERE YEAR(RewardMonth) = YEAR(CURDATE())
GROUP BY YEAR(RewardMonth);

-- 5. Employees who received rewards > 2000
SELECT e.EmpName, r.RewardAmount
FROM Employee e
JOIN Reward r ON e.EmpID = r.EmpID
WHERE r.RewardAmount > 2000;

-- ==========================================================
-- USER STORY 4 — ADVANCED QUERIES (JOINS & SUBQUERIES)
-- ==========================================================

-- 1. Display Employee Name, Department Name, Project Name, and Rating
SELECT e.EmpName, d.DeptName, p.ProjectName, pr.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pr ON e.EmpID = pr.EmpID
JOIN Project p ON pr.ProjectID = p.ProjectID;

-- 2. Highest-rated employee in each department
SELECT e.EmpName, d.DeptName, pr.Rating
FROM Performance pr
JOIN Employee e ON pr.EmpID = e.EmpID
JOIN Department d ON e.DeptID = d.DeptID
WHERE pr.Rating = (
    SELECT MAX(p2.Rating)
    FROM Performance p2
    JOIN Employee e2 ON p2.EmpID = e2.EmpID
    WHERE e2.DeptID = d.DeptID
);

-- 3. Employees with no rewards
SELECT EmpName
FROM Employee
WHERE EmpID NOT IN (SELECT EmpID FROM Reward);

-- ==========================================================
-- USER STORY 5 — TRANSACTION CONTROL AND OPTIMIZATION
-- ==========================================================

-- Start a transaction
START TRANSACTION;

-- Try inserting a new employee and related data
INSERT INTO Employee VALUES (6, 'Priya', 'F', '1997-12-02', '2024-07-01', 101);
INSERT INTO Performance VALUES (6, 203, 4.7, '2024-07-30');
INSERT INTO Reward VALUES (6, '2024-08-01', 2300);

-- Commit if successful, else rollback
COMMIT;

-- ==========================================================
-- Query Optimization Example using EXPLAIN
-- ==========================================================
-- Slow Query (without index analysis)
EXPLAIN SELECT e.EmpName, d.DeptName, p.ProjectName, pr.Rating
FROM Employee e
JOIN Department d ON e.DeptID = d.DeptID
JOIN Performance pr ON e.EmpID = pr.EmpID
JOIN Project p ON pr.ProjectID = p.ProjectID;

-- After index creation (already created idx_empname, idx_deptid)
-- Re-run EXPLAIN to compare improvement

-- ==========================================================
-- END OF SCRIPT
-- ==========================================================

-- Fetch all departments
SELECT * FROM Department;

-- Fetch all employees
SELECT * FROM Employee;

-- Fetch all projects
SELECT * FROM Project;

-- Fetch all performance records
SELECT * FROM Performance;

-- Fetch all rewards
SELECT * FROM Reward;

-- Fetch All Record From Database
SELECT 
    e.EmpID,
    e.EmpName,
    e.Gender,
    e.DOB,
    e.HireDate,
    d.DeptName,
    d.Location AS DeptLocation,
    p.ProjectName,
    pr.Rating AS PerformanceRating,
    pr.ReviewDate,
    r.RewardMonth,
    r.RewardAmount
FROM Employee e
LEFT JOIN Department d ON e.DeptID = d.DeptID
LEFT JOIN Performance pr ON e.EmpID = pr.EmpID
LEFT JOIN Project p ON pr.ProjectID = p.ProjectID
LEFT JOIN Reward r ON e.EmpID = r.EmpID
ORDER BY e.EmpID;
